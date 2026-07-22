# Dependency Upgrade — Node 24 + 19 package bumps

**Date**: 2026-07-22
**Branch**: `claude/website-lib-upgrades-562119`

## Summary

Swept all 36 direct dependencies; 19 were behind latest. Upgraded everything the
toolchain permits, moved the Node baseline from 20 (EOL) to 24 (Active LTS), and removed
three stale/unused entries. `npm audit` went from **12 vulnerabilities (1 critical,
7 high, 2 moderate, 2 low) → 0**.

## Node baseline: 20 → 24

Node 20 reached EOL on 2026-04-30. It was also actively blocking upgrades:

- `@testing-library/jest-dom@7` requires `node >=22`.
- `eslint@10` requires `^20.19.0 || ^22.13.0 || >=24`, and **crashes** on older 20.x with
  `TypeError: util.styleText is not a function` — ESLint 10 replaced `chalk` with
  `node:util`'s `styleText`, which landed in Node 20.12.0. The local Node was 20.11.0.

Changed: `package.json` `engines` → `>=24.0.0`; `.nvmrc` (was a **0-byte file**, so
`nvm use` failed outright) → `24`; `.github/workflows/ci.yml` three jobs → `node-version: 24`;
`Dockerfile` → `node:24-alpine` (was `node:latest`, unpinned).

Node 24 is Vercel's default runtime, so no dashboard change is needed.

## Removed dependencies

| Package | Why |
|---|---|
| `sharp` | Never imported by app code. Next 16.2 already ships it as its own `optionalDependency` (`^0.34.5`). The explicit `^0.33.2` pin only forced a **second copy** of the native binary — `^0.35.x` cannot satisfy `^0.34.5` on a 0.x caret. |
| `eslint-config-next` | Never imported by `eslint.config.mjs`. Pulled an unused subtree: `@next/eslint-plugin-next`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-import-resolver-typescript`. |
| `eslint-plugin-react` | Never imported. Peered on `eslint: ^3 \|\| … \|\| ^9.7` — the sole blocker for ESLint 10. |

Also fixed a pre-existing broken peer: `@eslint/js@10.0.1` peers on `eslint: ^10.0.0` while
the project ran `eslint@9.39.4`. This was silently tolerated only because `.npmrc` sets
`legacy-peer-deps=true`. ESLint 10 repairs it.

## `overrides` block — why it exists

After the upgrade, 3 advisories remained, both inside **Next's own tree**:

- `sharp` 0.34.5 (high — libvips CVE-2026-33327/33328/35590/35591), via Next's `optionalDependencies`.
- `postcss` 8.4.31 (moderate — XSS via unescaped `</style>`), which Next pins **exactly**.

Neither is reachable by bumping our own direct deps. Added:

```json
"overrides": { "sharp": "^0.35.3", "postcss": "^8.5.22" }
```

This collapses to a **single** `sharp@0.35.3` (libvips 8.18.3) and a single `postcss@8.5.22`,
and clears both advisories. **Verified** the override does not break Next:
`next build` succeeds, and the image optimizer was exercised directly —
`/_next/image?url=%2Fimages%2Fprofile.jpg&w=640|1200` returns HTTP 200 with correctly
resized progressive JPEGs (640x631, 1200x1184).

**Revisit**: drop these overrides once Next bumps its own `sharp`/`postcss` ranges past the
fixed versions, so we stop forcing versions Next did not ask for.

## TypeScript: stayed on 5.9.3, did NOT go to 7.0.2

TypeScript 7 is the current `latest` on npm, and it is **not adoptable here**. It is the
native Go port: the package has no `main`, its `"."` export is just `./lib/version.cjs`
(the version string), it ships **no `tsserver`**, and the real API sits behind
`./unstable/*` subpaths. Per the GA announcement, **7.0 ships no API at all** — a new one
is expected in 7.1.

What would break:

| Consumer | Under TS 7 |
|---|---|
| `next build` (16.2.x) | **Breaks.** `hasNecessaryDependencies()` probes for `typescript/lib/typescript.js`, so Next reports TypeScript as *not installed*. Exits 1 under CI; **locally it shells out and mutates your dependency tree**. Fires even with `typescript.ignoreBuildErrors`. Fixed only by `experimental.useTypeScriptCli`, which does not exist in 16.2.11 — it first appears in 16.3 canary/preview. |
| `@typescript-eslint` 8.65.0 | **Hard-errors by design** — PR #12529 added an explicit TS-7 assertion, shipped in the very version we now run. No v9 exists in any dist-tag. |
| `plugins: [{"name": "next"}]` in `tsconfig.json` | A **tsserver** plugin; TS 7 ships no tsserver. |
| `ts-jest` 29.4.12 | "Supports TS 7" only via compatibility aliases; peer range still `>=4.3 <7`, and it runs the TS 6 API regardless. |

**Guard added**: `renovate.json` now caps `typescript` at `<7` and `@types/node` at `<25`
(the latter must track the Node 24 runtime; npm `latest` is 26.x). Without this the daily
Renovate job would propose `typescript@7` and break CI.

**Revisit when** all three land: TS 7.1 ships the new API, typescript-eslint
[#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) closes, and
Next's `useTypeScriptCli` reaches stable.

Note TypeScript **6.0.3** also exists (last JS-based release, keeps `tsserver`, satisfies
typescript-eslint's `<6.1.0` peer) — but it is a real migration, not a bump: `strict`
defaults to `true`, `module` to `esnext`, `target` to ES2025, `--outFile` removed. Its own
task if wanted.

## Verification performed

| Gate | Result |
|---|---|
| `node --version` | v24.16.0 |
| `npm run lint` | **0 errors**, 4 warnings — byte-identical to ESLint 9's output, same 4 pre-existing locations |
| `npm run test:coverage` | **26/26 suites, 298/298 tests pass** |
| `npm run build` | exit 0; TypeScript check passes; 132 static pages generated |
| `npm audit` | **0 vulnerabilities** (was 12) |
| Image optimizer | HTTP 200, correct resizes — proves the forced `sharp@0.35.3` works |
| Locale routing | `/`, `/fr`, `/de`, `/es` all 200 |
| Draft blocking (production) | all 4 drafts 404 in every locale; absent from `/posts` and `sitemap.xml` |
| Browser console | no errors |

`date-fns` v4 needed **no code change** — v4 keeps `parseISO`, `format` and the `Locale`
type on the root export and the locales on `date-fns/locale`; only the ESM/CJS layout
inverted (`index.js` is now ESM, `index.cjs` CJS). Formatted output is byte-identical to
v3 for all four locales. `@testing-library/jest-dom` v7's only breaking changes are the
now-required `@testing-library/dom` peer (already declared) and Node >=22; **no matchers
were removed or renamed**.

## Pre-existing issues found (NOT caused by this upgrade, NOT fixed here)

No CSS or component files were modified — `git status` covers only `package.json`,
`package-lock.json`, `.nvmrc`, `Dockerfile`, `ci.yml`, `.gitignore`, `renovate.json`, and
the deleted `bun.lock`. The following were discovered while verifying:

1. **`app/[locale]/components/Date.tsx` is dead code.** Its only importer is its own test.
   No page renders it, so `date-fns` — the project's only use — ships to no one. Either
   wire it into post headers or delete both it and its 12 tests.
2. **Shiki's dual-theme output is never consumed.** `CodeBlock.tsx` sets
   `defaultColor: false`, so shiki emits only `--shiki-light` / `--shiki-dark` CSS
   variables and no `color`. Nothing in `styles/globals.css` maps them, so code blocks
   render in the inherited body colour rather than syntax-highlighted.
3. **There is no dark mode.** `globals.css` (1993 lines) contains no
   `prefers-color-scheme` query, yet components carry Tailwind `dark:` variants
   (`CodeBlock.tsx` etc.) that can therefore never activate.
4. **`tailwindcss-config.js` (22KB) is dead.** Tailwind v4 is CSS-first; the file is
   referenced only in `eslint.config.mjs`'s ignore list.
5. **`CLAUDE.md` and `.debug/000-quick-reference.md` are stale.** Both describe a Pages
   Router + `next-translate` + webpack-only project. Since `474b44c` this is App Router +
   `next-intl` + Turbopack. CLAUDE.md still instructs "never switch to Turbopack" while
   `package.json` runs `next dev --turbopack`.
6. **Stray lockfile outside the repo.** `next build` warns it inferred the workspace root
   as `/Users/alienard/Code` because of a `pnpm-lock.yaml` there (dated Feb 2025). Set
   `turbopack.root` in `next.config.ts` to pin it.
7. **`.npmrc` sets `legacy-peer-deps=true`**, which is what hid the `@eslint/js` peer
   mismatch. Worth removing now the tree is clean.
