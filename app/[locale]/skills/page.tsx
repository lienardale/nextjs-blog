import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import {getProjects, type Project} from '../../../lib/registry';
import HardSkills, {type Skill} from '../components/HardSkills';
import ProjectCardTilt from '../components/ProjectCardTilt';
import SiteFooter from '../components/SiteFooter';

const skills: Skill[] = [
  {name: 'TypeScript', tag: 'FE · BE', level: 92, note: 'primary stack · 6y'},
  {name: 'Python', tag: 'BE', level: 88, note: 'Wiremind backend · 4y'},
  {name: 'Angular', tag: 'FE', level: 86, note: 'production UIs · 4y'},
  {name: 'Postgres', tag: 'DATA', level: 80, note: 'schemas & ORM · 5y'},
  {name: 'Redis / RabbitMQ', tag: 'BE', level: 75, note: 'cache & queues · daily, Wiremind'},
  {name: 'Elasticsearch', tag: 'DATA', level: 70, note: 'search & analytics · 3y'},
  {name: 'AI-augmented dev', tag: 'TOOLS', level: 78, note: 'Claude Code · GPT Codex'},
  {name: 'Docker', tag: 'OPS', level: 68, note: 'working knowledge · 4y', soft: true},
];

const previews: Record<string, React.ReactNode> = {
  ft_transcendence: (
    <svg viewBox="0 0 400 200" preserveAspectRatio="none">
      <rect x="20" y="20" width="360" height="160" fill="none" stroke="currentColor" strokeWidth="1" style={{color: 'var(--ink-muted)', opacity: 0.3}} />
      <line x1="200" y1="20" x2="200" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" style={{color: 'var(--ink-muted)', opacity: 0.4}} />
      <rect x="30" y="80" width="6" height="40" fill="currentColor" style={{color: 'var(--ink)'}} />
      <rect x="364" y="100" width="6" height="40" fill="currentColor" style={{color: 'var(--accent)'}} />
      <circle cx="220" cy="110" r="5" fill="currentColor" style={{color: 'var(--accent)'}} />
    </svg>
  ),
  webserv: (
    <svg viewBox="0 0 400 200">
      <g style={{fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'currentColor', color: 'var(--ink-soft)'}}>
        <text x="20" y="40">GET /index.html HTTP/1.1</text>
        <text x="20" y="60" style={{opacity: 0.6}}>Host: localhost:8080</text>
        <text x="20" y="100" style={{color: 'var(--accent)', fill: 'var(--accent)'}}>HTTP/1.1 200 OK</text>
        <text x="20" y="120" style={{opacity: 0.6}}>Content-Type: text/html</text>
        <text x="20" y="140" style={{opacity: 0.6}}>Content-Length: 1247</text>
        <text x="20" y="170" style={{opacity: 0.5}}>[ body ... ]</text>
      </g>
    </svg>
  ),
  mini_rt: (
    <svg viewBox="0 0 400 200">
      <defs>
        <radialGradient id="rtg" cx="0.3" cy="0.3">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="200" fill="currentColor" style={{color: 'var(--ink)', opacity: 0.04}} />
      <ellipse cx="120" cy="170" rx="80" ry="8" fill="currentColor" style={{color: 'var(--ink)', opacity: 0.3}} />
      <circle cx="130" cy="120" r="48" fill="url(#rtg)" style={{color: 'var(--accent)'}} />
      <circle cx="280" cy="100" r="28" fill="currentColor" style={{color: 'var(--ink)', opacity: 0.4}} />
      <line x1="50" y1="30" x2="130" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" style={{color: 'var(--accent)', opacity: 0.5}} />
    </svg>
  ),
  minishell: (
    <svg viewBox="0 0 400 200">
      <g style={{fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'currentColor', color: 'var(--ink-soft)'}}>
        <text x="20" y="40" style={{color: 'var(--accent)', fill: 'var(--accent)'}}>$ ls -la | grep .c | wc -l</text>
        <text x="20" y="60" style={{opacity: 0.6}}>12</text>
        <text x="20" y="100" style={{color: 'var(--accent)', fill: 'var(--accent)'}}>$ echo $HOME &gt; out.txt</text>
        <text x="20" y="120" style={{opacity: 0.6}}>$ cat &lt; out.txt</text>
        <text x="20" y="140" style={{opacity: 0.6}}>/Users/alex</text>
        <text x="20" y="170" style={{color: 'var(--accent)', fill: 'var(--accent)'}}>$ █</text>
      </g>
    </svg>
  ),
  bdi_2023: (
    <svg viewBox="0 0 400 200">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" style={{color: 'var(--ink-muted)'}}>
        <rect x="20" y="20" width="110" height="100" rx="2" />
        <rect x="140" y="20" width="110" height="100" rx="2" />
        <rect x="260" y="20" width="120" height="100" rx="2" />
        <rect x="20" y="130" width="360" height="50" rx="2" />
      </g>
      <g style={{color: 'var(--accent)'}}>
        <path d="M70 60 q-10 0 -10 10 v18 q0 10 10 10 h22 l8 12 v-12 h6 q10 0 10 -10 v-18 q0 -10 -10 -10 z"
              fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
      </g>
      <g style={{fontFamily: 'var(--font-mono)', fontSize: '10px', fill: 'var(--ink-soft)'}}>
        <text x="155" y="170" style={{letterSpacing: '0.18em', textTransform: 'uppercase'}}>BDI · CMBD</text>
      </g>
      <g style={{fontFamily: 'var(--font-mono)', fontSize: '9px', fill: 'currentColor', color: 'var(--ink-muted)'}}>
        <text x="148" y="62">!</text>
        <text x="148" y="78" style={{opacity: 0.6}}>?</text>
        <text x="270" y="62" style={{opacity: 0.6}}>...</text>
      </g>
    </svg>
  ),
  gpx_to_video: (
    <svg viewBox="0 0 400 200">
      <g fill="none" stroke="currentColor" strokeWidth="1" style={{color: 'var(--ink-muted)', opacity: 0.55}}>
        <rect x="20" y="40" width="360" height="120" rx="2" />
        <line x1="20" y1="55" x2="380" y2="55" />
        <line x1="20" y1="145" x2="380" y2="145" />
      </g>
      <g fill="currentColor" style={{color: 'var(--ink-muted)', opacity: 0.6}}>
        <rect x="30" y="44" width="8" height="8" />
        <rect x="50" y="44" width="8" height="8" />
        <rect x="70" y="44" width="8" height="8" />
        <rect x="90" y="44" width="8" height="8" />
        <rect x="110" y="44" width="8" height="8" />
        <rect x="130" y="44" width="8" height="8" />
        <rect x="150" y="44" width="8" height="8" />
        <rect x="170" y="44" width="8" height="8" />
        <rect x="190" y="44" width="8" height="8" />
        <rect x="210" y="44" width="8" height="8" />
        <rect x="230" y="44" width="8" height="8" />
        <rect x="250" y="44" width="8" height="8" />
        <rect x="270" y="44" width="8" height="8" />
        <rect x="290" y="44" width="8" height="8" />
        <rect x="310" y="44" width="8" height="8" />
        <rect x="330" y="44" width="8" height="8" />
        <rect x="350" y="44" width="8" height="8" />
        <rect x="370" y="44" width="8" height="8" />
        <rect x="30" y="148" width="8" height="8" />
        <rect x="50" y="148" width="8" height="8" />
        <rect x="70" y="148" width="8" height="8" />
        <rect x="90" y="148" width="8" height="8" />
        <rect x="110" y="148" width="8" height="8" />
        <rect x="130" y="148" width="8" height="8" />
        <rect x="150" y="148" width="8" height="8" />
        <rect x="170" y="148" width="8" height="8" />
        <rect x="190" y="148" width="8" height="8" />
        <rect x="210" y="148" width="8" height="8" />
        <rect x="230" y="148" width="8" height="8" />
        <rect x="250" y="148" width="8" height="8" />
        <rect x="270" y="148" width="8" height="8" />
        <rect x="290" y="148" width="8" height="8" />
        <rect x="310" y="148" width="8" height="8" />
        <rect x="330" y="148" width="8" height="8" />
        <rect x="350" y="148" width="8" height="8" />
        <rect x="370" y="148" width="8" height="8" />
      </g>
      <path d="M30 130 C 80 120, 110 95, 160 100 S 240 70, 280 80 S 350 110, 380 90"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            style={{color: 'var(--accent)'}} />
      <circle cx="30" cy="130" r="4" fill="currentColor" style={{color: 'var(--accent)'}} />
      <circle cx="380" cy="90" r="4" fill="currentColor" style={{color: 'var(--accent)'}} />
    </svg>
  ),
  nextjs_blog: (
    <svg viewBox="0 0 400 200">
      <g fill="none" stroke="currentColor" strokeWidth="1" style={{color: 'var(--ink-muted)', opacity: 0.45}}>
        <line x1="40" y1="60" x2="200" y2="60" />
        <line x1="40" y1="80" x2="240" y2="80" />
        <line x1="40" y1="100" x2="180" y2="100" />
        <line x1="40" y1="120" x2="220" y2="120" />
        <line x1="40" y1="140" x2="160" y2="140" />
      </g>
      <g style={{fontFamily: 'var(--font-display)', fontSize: '120px', fill: 'currentColor', color: 'var(--ink)'}}>
        <text x="270" y="138" style={{fontStyle: 'italic'}}>N</text>
      </g>
      <g style={{fontFamily: 'var(--font-mono)', fontSize: '10px', fill: 'currentColor', color: 'var(--accent)'}}>
        <text x="270" y="160" style={{letterSpacing: '0.14em'}}>en · fr · de · es</text>
      </g>
      <line x1="40" y1="40" x2="360" y2="40" stroke="currentColor" strokeWidth="0.5" style={{color: 'var(--ink-muted)', opacity: 0.4}} />
      <line x1="40" y1="170" x2="360" y2="170" stroke="currentColor" strokeWidth="0.5" style={{color: 'var(--ink-muted)', opacity: 0.4}} />
    </svg>
  ),
};

function liveDomain(url: string | undefined): string {
  if (!url) return 'Complete';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function projectSpec(p: Project): ReadonlyArray<readonly [string, string]> {
  return [
    ['Stack', p.stack],
    ['Lines', p.stats.lines.toLocaleString()],
    ['Commits', String(p.stats.commits)],
    p.live ? ['Live', liveDomain(p.live)] : ['Status', 'Complete'],
  ] as const;
}

const HOME_ORDER: string[] = [
  'ft_transcendence',
  'mini_rt',
  'bdi_2023',
  'nextjs_blog',
  'gpx_to_video',
];

const softSkills = [
  {
    nameKey: 'skills.soft_01_name',
    descKey: 'skills.soft_01_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="7" r="3" /><circle cx="5" cy="11" r="2.2" /><circle cx="19" cy="11" r="2.2" />
        <path d="M6 20a6 6 0 0112 0" /><path d="M2 18a4 4 0 014-3" /><path d="M22 18a4 4 0 00-4-3" />
      </svg>
    ),
  },
  {
    nameKey: 'skills.soft_02_name',
    descKey: 'skills.soft_02_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M16 9h5V4" /><path d="M3 19v-5h5" />
        <path d="M3.5 9.5a8.5 8.5 0 0114-3.5L21 9" /><path d="M20.5 14.5a8.5 8.5 0 01-14 3.5L3 14" />
      </svg>
    ),
  },
  {
    nameKey: 'skills.soft_03_name',
    descKey: 'skills.soft_03_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" />
        <path d="M8 12h2" /><path d="M8 16h2" /><path d="M13 12h4" /><path d="M13 16h4" />
      </svg>
    ),
  },
  {
    nameKey: 'skills.soft_04_name',
    descKey: 'skills.soft_04_desc',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('skills.title_meta')};
}

export default async function SkillsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const allProjects = getProjects(locale);
  const byId = new Map(allProjects.map((p) => [p.id, p]));
  const orderedProjects: Project[] = [
    ...HOME_ORDER.map((id) => byId.get(id)).filter((p): p is Project => Boolean(p)),
    ...allProjects.filter((p) => !HOME_ORDER.includes(p.id)),
  ];

  return (
    <div className="section-page">
      <div className="crumbs">
        <Link href="/">{t('nav.index')}</Link> / <span>{t('nav.skills')}</span>
      </div>
      <div className="section-head">
        <div>
          <span className="kind">{t('skills.eyebrow')}</span>
          <h1 data-reveal dangerouslySetInnerHTML={{__html: t.raw('skills.title') as string}} />
        </div>
        <div className="kind">{t('skills.summary')}</div>
      </div>

      <section className="hard" data-reveal>
        <header className="hard-head">
          <div className="hard-head-l">
            <span className="eyebrow">{t('skills.hard_eyebrow')}</span>
            <h2 className="hard-title" dangerouslySetInnerHTML={{__html: t.raw('skills.hard_title') as string}} />
            <p className="hard-lede">{t('skills.hard_lede')}</p>
          </div>
          <ul className="hard-meta" aria-label="Section summary">
            <li>
              <span className="hm-key">{t('skills.hard_meta_tracked')}</span>
              <b>08</b>
              <span className="hm-unit">{t('skills.hard_meta_tracked_u')}</span>
            </li>
            <li>
              <span className="hm-key">{t('skills.hard_meta_tenure')}</span>
              <b>6<i>y</i></b>
              <span className="hm-unit">{t('skills.hard_meta_tenure_u')}</span>
            </li>
            <li>
              <span className="hm-key">{t('skills.hard_meta_peak')}</span>
              <b>92<i>/100</i></b>
              <span className="hm-unit">{t('skills.hard_meta_peak_u')}</span>
            </li>
            <li>
              <span className="hm-key">{t('skills.hard_meta_split')}</span>
              <b>2<span className="hm-sep">·</span>3</b>
              <span className="hm-unit">{t('skills.hard_meta_split_u')}</span>
            </li>
          </ul>
        </header>

        <HardSkills skills={skills} />

        <footer className="hard-foot">
          <span className="mono"><i className="fk fk-0" />0</span>
          <span className="mono"><i className="fk fk-1" />50 — comfortable</span>
          <span className="mono"><i className="fk fk-2" />75 — fluent</span>
          <span className="mono"><i className="fk fk-3" />100</span>
          <span className="hard-foot-spacer" />
          <span className="mono">measured against shipped projects, not job titles.</span>
        </footer>
      </section>

      <div className="proj-block">
        <div className="proj-head" data-reveal>
          <div>
            <span className="eyebrow">{t('skills.proj_eyebrow')}</span>
            <h2 dangerouslySetInnerHTML={{__html: t.raw('skills.proj_title') as string}} />
          </div>
          <p className="lede">{t('skills.proj_lede')}</p>
        </div>
        <div className="proj-grid">
          {orderedProjects.map((p, i) => (
            <ProjectCardTilt key={p.id} delay={i}>
              <div className="pc-head">
                <span>Project / {String(i + 1).padStart(2, '0')}</span>
                <span className="stamp">{p.stamp}</span>
              </div>
              <h3 dangerouslySetInnerHTML={{__html: `${p.title}<em>.</em>`}} />
              <p>{p.description}</p>
              <div className="preview preview-route">{previews[p.id]}</div>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="spec">
                {projectSpec(p).map(([label, value]) => (
                  <div key={label}><b>{label}</b>{value}</div>
                ))}
              </div>
              <div className="links">
                <a href={p.github} target="_blank" rel="noopener" data-cursor="github">GitHub</a>
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener" data-cursor="open">Live site</a>
                ) : null}
              </div>
            </ProjectCardTilt>
          ))}
        </div>
      </div>

      <div className="soft-block">
        <div className="soft-head" data-reveal>
          <span className="eyebrow">{t('skills.soft_eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{__html: t.raw('skills.soft_title') as string}} />
          <p className="lede">{t('skills.soft_lede')}</p>
        </div>
        <div className="flip-grid">
          {softSkills.map((s, i) => (
            <div key={i} className="flip" data-reveal style={{['--d' as string]: i} as React.CSSProperties}>
              <div className="flip-inner">
                <div className="flip-front">
                  {s.icon}
                  <span className="flip-name" dangerouslySetInnerHTML={{__html: t.raw(s.nameKey) as string}} />
                </div>
                <div className="flip-back">
                  <p>{t(s.descKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter rightLabel="03 / Skills" />
    </div>
  );
}
