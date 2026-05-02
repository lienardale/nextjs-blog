import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import {getSortedItems} from '../../../lib/registry';
import SiteFooter from '../components/SiteFooter';

const postMeta: Record<string, {topicKey: string; readKey: string; titleKey: string}> = {
  'building-modern-blog': {topicKey: 'posts.topic_nextjs', readKey: 'posts.read_5', titleKey: 'posts.title_building'},
  'next-intl-guide': {topicKey: 'posts.topic_i18n', readKey: 'posts.read_7', titleKey: 'posts.title_intl'},
  'typescript-react-patterns': {topicKey: 'posts.topic_react', readKey: 'posts.read_8', titleKey: 'posts.title_ts'},
  'ssg-ssr': {topicKey: 'posts.topic_nextjs', readKey: 'posts.read_2', titleKey: 'posts.title_ssg'},
  'pre-rendering': {topicKey: 'posts.topic_nextjs', readKey: 'posts.read_2', titleKey: 'posts.title_prerender'},
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('posts.title_meta')};
}

function fmtYear(date: string): string {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()} · ${m}`;
}

export default async function PostsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const items = getSortedItems('posts', locale);

  return (
    <div className="section-page medium">
      <div className="crumbs">
        <Link href="/">{t('nav.index')}</Link> / <span>{t('nav.posts')}</span>
      </div>
      <div className="section-head">
        <div>
          <span className="kind">{t('posts.eyebrow')}</span>
          <h1 data-reveal dangerouslySetInnerHTML={{__html: t.raw('posts.title') as string}} />
        </div>
        <div className="kind">{t('posts.summary')}</div>
      </div>

      <div className="post-meta-bar" data-reveal>
        <div className="filters">
          <span className="is-active">{t('posts.filter_all')}</span>
          <span>Next.js</span>
          <span>React</span>
          <span>i18n</span>
        </div>
        <span>{t('posts.sort_label')}</span>
        <span>{t('posts.results', {count: items.length})}</span>
      </div>

      <div className="posts-list">
        {items.map((p, i) => {
          const meta = postMeta[p.id];
          return (
            <Link
              key={p.id}
              href={`/posts/${p.id}`}
              className="post-row"
              data-cursor="read"
              data-reveal
              style={{['--d' as string]: i} as React.CSSProperties}
            >
              <span className="yr">{fmtYear(p.date)}</span>
              <h3
                dangerouslySetInnerHTML={{
                  __html: meta ? (t.raw(meta.titleKey) as string) : p.title,
                }}
              />
              <span className="topic">{meta ? t(meta.topicKey) : '—'}</span>
              <span className="read">{meta ? t(meta.readKey) : ''}</span>
            </Link>
          );
        })}
      </div>

      <SiteFooter rightLabel="06 / Posts" />
    </div>
  );
}
