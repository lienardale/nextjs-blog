import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import {getProjects, type Project} from '../../../lib/registry';
import HardSkills, {type Skill} from '../components/HardSkills';
import SectionLabel from '../components/SectionLabel';
import SkillsHeader from '../components/SkillsHeader';

const skills: Skill[] = [
  {name: 'TypeScript', tag: 'FE · BE', level: 92, note: 'primary stack · 6y'},
  {name: 'Python', tag: 'BE', level: 88, note: 'Wiremind backend · 4y'},
  {name: 'Angular', tag: 'FE', level: 86, note: 'production UIs · 4y'},
  {name: 'Postgres', tag: 'DATA', level: 80, note: 'schemas & ORM · 5y'},
  {name: 'Redis / RabbitMQ', tag: 'BE', level: 75, note: 'cache & queues · daily, Wiremind'},
  {name: 'Elasticsearch', tag: 'DATA', level: 70, note: 'search & analytics · 3y'},
  {name: 'AI-augmented dev', tag: 'TOOLS', level: 78, note: 'Claude Code · GPT Codex'},
  {name: 'Docker', tag: 'OPS', level: 68, note: 'working knowledge · 4y'},
];

const HOME_ORDER: string[] = [
  'ft_transcendence',
  'mini_rt',
  'bdi_2023',
  'nextjs_blog',
  'gpx_to_video',
];

const softSkills = [
  {nameKey: 'skills.soft_01_name', descKey: 'skills.soft_01_desc'},
  {nameKey: 'skills.soft_02_name', descKey: 'skills.soft_02_desc'},
  {nameKey: 'skills.soft_03_name', descKey: 'skills.soft_03_desc'},
  {nameKey: 'skills.soft_04_name', descKey: 'skills.soft_04_desc'},
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

  const projectSpec = (p: Project) =>
    [
      p.stack,
      p.stamp,
      `${p.stats.lines.toLocaleString(locale)} ${t('projects.lines')}`,
      `${p.stats.commits.toLocaleString(locale)} ${t('projects.commits')}`,
    ].join(' · ');

  return (
    <div className="flex flex-col gap-8">
      <SkillsHeader active="overview" t={t} />

      <div className="flex flex-col gap-14 pt-2">
        <section>
          <SectionLabel
            aside={<span className="font-mono text-[11px] text-ink-muted">{t('skills.hard_note')}</span>}
          >
            {t('skills.hard_label')}
          </SectionLabel>
          <HardSkills skills={skills} />
        </section>

        <section>
          <SectionLabel
            aside={
              <Link href="/skills/projects" className="link-muted text-[13px]">
                {t('home.selected_cta')}
              </Link>
            }
          >
            {t('skills.tab_projects')}
          </SectionLabel>
          <p className="lede mb-4">{t('skills.proj_lede')}</p>
          {orderedProjects.map((p) => (
            <div key={p.id} className="flex flex-col gap-1.5 border-t border-rule py-[18px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium">
                  {p.title} <span className="font-normal text-ink-muted">— {p.tagline}</span>
                </span>
                <div className="flex shrink-0 gap-[14px] text-[13px]">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-muted">
                    GitHub ↗
                  </a>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-muted">
                      {t('projects.live')} ↗
                    </a>
                  ) : null}
                </div>
              </div>
              <span className="text-pretty text-[14px] text-ink-soft">{p.description}</span>
              <span className="font-mono text-[11px] text-ink-muted">{projectSpec(p)}</span>
            </div>
          ))}
        </section>

        <section>
          <SectionLabel
            aside={
              <Link href="/skills/soft-skills" className="link-muted text-[13px]" aria-label={t('skills.tab_soft')}>
                →
              </Link>
            }
          >
            {t('skills.tab_soft')}
          </SectionLabel>
          {softSkills.map((s) => (
            <div key={s.nameKey} className="row grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] text-[14px]">
              <span className="font-medium">{t(s.nameKey)}</span>
              <span className="text-pretty text-ink-soft">{t(s.descKey)}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
