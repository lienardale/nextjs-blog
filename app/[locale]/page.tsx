import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/i18n/navigation';
import {getProjects, getSortedItems} from '../../lib/registry';
import SectionLabel from './components/SectionLabel';

const sections = [
  {href: '/experience', nameKey: 'nav.experience', metaKey: 'home.idx_01_meta'},
  {href: '/education', nameKey: 'nav.education', metaKey: 'home.idx_02_meta'},
  {href: '/skills', nameKey: 'nav.skills', metaKey: 'home.idx_03_meta'},
  {href: '/contact', nameKey: 'nav.infos', metaKey: 'home.idx_04_meta'},
  {href: '/about_me', nameKey: 'nav.hobbies', metaKey: 'home.idx_05_meta'},
  {href: '/posts', nameKey: 'nav.posts', metaKey: 'home.idx_06_meta'},
];

const SELECTED_IDS = [
  'ft_transcendence',
  'mini_rt',
  'bdi_2023',
  'nextjs_blog',
  'gpx_to_video',
];

const NOW = ['reading', 'learning', 'riding', 'listening'];

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const projectsById = new Map(getProjects(locale).map((p) => [p.id, p]));
  const selected = SELECTED_IDS.map((id) => projectsById.get(id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  // The Posts row count excludes drafts, so it is resolved at render time
  // rather than baked into the locale string.
  const postCount = String(getSortedItems('posts', locale).length).padStart(2, '0');

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-5">
        {/* Stacked on phones; photo and name share a line from sm up. */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-4">
          <Image
            src="/images/profile.jpg"
            alt="Alexandre Lienard"
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full object-cover"
          />
          <h1 className="page-h1">Alexandre Lienard</h1>
        </div>
        <p className="text-pretty text-ink-soft">{t('home.intro')}</p>
        <p className="text-[14px] text-ink-muted">
          {t.rich('home.builtWith', {
            link: (chunks) => (
              <a
                href="https://github.com/lienardale/nextjs-blog"
                target="_blank"
                rel="noopener"
                className="text-ink underline decoration-ink-muted underline-offset-[3px]"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <nav>
        <SectionLabel>{t('nav.index')}</SectionLabel>
        {sections.map((s, i) => (
          <Link key={s.href} href={s.href} className="row grid-cols-[32px_minmax(0,1fr)_auto]">
            <span className="font-mono text-[11px] text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-medium">{t(s.nameKey)}</span>
            <span className="text-right text-[13px] text-ink-muted">{t(s.metaKey, {count: postCount})}</span>
          </Link>
        ))}
      </nav>

      <section>
        <SectionLabel
          aside={
            <Link href="/skills/projects" className="link-muted text-[13px]">
              {t('home.selected_cta')}
            </Link>
          }
        >
          {t('home.selected_label')}
        </SectionLabel>
        {selected.map((p) => (
          <Link key={p.id} href="/skills" className="row grid-cols-[minmax(0,1fr)_auto]">
            <span>
              <span className="font-medium">{p.title}</span>{' '}
              <span className="text-ink-muted">— {p.tagline}</span>
            </span>
            <span className="font-mono text-[11px] text-ink-muted">{p.stamp}</span>
          </Link>
        ))}
      </section>

      <section>
        <SectionLabel>{t('home.now_label')}</SectionLabel>
        {NOW.map((item) => (
          <div key={item} className="row grid-cols-[104px_minmax(0,1fr)] py-3 text-[14px]">
            <span className="text-ink-muted">{t(`home.now_${item}_lb`)}</span>
            <span>{t(`home.now_${item}_v`)}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
