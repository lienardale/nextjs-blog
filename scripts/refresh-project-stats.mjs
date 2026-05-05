#!/usr/bin/env node
/**
 * Refresh lib/project-stats.json by querying GitHub for commit/contributor counts
 * and cloning each repo to /tmp to count source lines with `wc -l` (cloc when
 * available — falls back automatically).
 *
 * Usage: npm run refresh:project-stats
 * Requires: gh (authenticated), git.
 */
import {execFileSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, rmSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

// School projects (id: ft_transcendence, webserv, mini_rt, minishell) are
// intentionally omitted: their displayed numbers are 42 peer-review counts and
// should not be overwritten by GitHub-API values, which reflect fork state and
// include vendored libraries (libft, etc.). Edit lib/project-stats.json by hand
// for those four.
const PROJECTS = [
  {id: 'bdi_2023',     owner: 'lienardale', name: 'bdi_2023'},
  {id: 'gpx_to_video', owner: 'lienardale', name: 'gpx-to-video'},
  {id: 'nextjs_blog',  owner: 'lienardale', name: 'nextjs-blog'},
];

const SRC_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'css', 'c', 'h', 'cpp', 'hpp', 'php', 'py'];
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

function sh(cmd, args, opts = {}) {
  return execFileSync(cmd, args, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'], ...opts});
}

function hasCloc() {
  try {
    sh('cloc', ['--version']);
    return true;
  } catch {
    return false;
  }
}

function ghGraphql(query) {
  const out = sh('gh', ['api', 'graphql', '-f', `query=${query}`]);
  return JSON.parse(out);
}

function fetchAggregateStats() {
  const aliasFor = (id) => id.replace(/[^a-z0-9]/gi, '_');
  const queryParts = PROJECTS.map(
    (p) => `${aliasFor(p.id)}: repository(owner: "${p.owner}", name: "${p.name}") {
      defaultBranchRef { target { ... on Commit { history { totalCount } } } }
    }`,
  ).join('\n');
  const data = ghGraphql(`query { ${queryParts} }`).data;
  const out = {};
  for (const p of PROJECTS) {
    const node = data[aliasFor(p.id)];
    out[p.id] = {commits: node?.defaultBranchRef?.target?.history?.totalCount ?? 0};
  }
  return out;
}

function fetchContributors(p) {
  try {
    const out = sh('gh', ['api', `/repos/${p.owner}/${p.name}/contributors?per_page=100&anon=1`]);
    return JSON.parse(out).length;
  } catch {
    return 1;
  }
}

function countLinesWithCloc(dir) {
  const langs = ['TypeScript', 'JavaScript', 'CSS', 'C', 'C++', 'C/C++ Header', 'PHP', 'Python', 'JSX', 'TSX'].join(',');
  const out = sh('cloc', ['--json', `--include-lang=${langs}`, '--exclude-dir=' + EXCLUDE_DIRS.join(','), dir]);
  const data = JSON.parse(out);
  return data?.SUM?.code ?? 0;
}

function countLinesWithWc(dir) {
  const findArgs = ['.', '-type', 'f'];
  for (const ext of SRC_EXTENSIONS) {
    findArgs.push('-name', `*.${ext}`, '-o');
  }
  findArgs.pop(); // trailing -o
  const findGroup = ['(', ...findArgs.slice(2), ')'];
  for (const ex of EXCLUDE_DIRS) {
    findGroup.unshift('-not', '-path', `*/${ex}/*`);
  }
  // Simpler: use shell pipeline
  const cmd = `find . -type f \\( ${SRC_EXTENSIONS.map((e) => `-name "*.${e}"`).join(' -o ')} \\) ${EXCLUDE_DIRS.map((e) => `! -path "*/${e}/*"`).join(' ')} -print0 | xargs -0 wc -l 2>/dev/null | tail -1 | awk '{print $1}'`;
  const out = execFileSync('bash', ['-c', cmd], {cwd: dir, encoding: 'utf8'}).trim();
  return Number(out) || 0;
}

function fetchLines(p, useCloc) {
  const tmp = mkdtempSync(join(tmpdir(), `refresh-${p.id}-`));
  try {
    sh('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${p.owner}/${p.name}.git`, tmp]);
    return useCloc ? countLinesWithCloc(tmp) : countLinesWithWc(tmp);
  } finally {
    rmSync(tmp, {recursive: true, force: true});
  }
}

function main() {
  const useCloc = hasCloc();
  console.log(`Refreshing project stats… (lines counted via ${useCloc ? 'cloc' : 'wc -l'})`);
  const aggregateStats = fetchAggregateStats();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, '..', 'lib', 'project-stats.json');
  const existing = JSON.parse(readFileSync(outPath, 'utf8'));
  const merged = {...existing};
  for (const p of PROJECTS) {
    process.stdout.write(`  ${p.owner}/${p.name} … `);
    const contributors = fetchContributors(p);
    const lines = fetchLines(p, useCloc);
    const commits = aggregateStats[p.id]?.commits ?? 0;
    merged[p.id] = {contributors, lines, commits};
    console.log(`${contributors} contrib · ${lines.toLocaleString()} lines · ${commits} commits`);
  }
  const next = JSON.stringify(merged, null, 2) + '\n';
  if (readFileSync(outPath, 'utf8').trim() === next.trim()) {
    console.log('No changes.');
  } else {
    writeFileSync(outPath, next);
    console.log(`Wrote ${outPath}`);
  }
}

main();
