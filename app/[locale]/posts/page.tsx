import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import {getSortedItems} from '../../../lib/registry';
import PostsList, {type PostsListItem, type PostsFilter} from '../components/PostsList';
import SiteFooter from '../components/SiteFooter';

const postMeta: Record<string, {topicKey: string; readKey: string; titleKey: string}> = {
  'monolith-to-microservice': {topicKey: 'posts.topic_architecture', readKey: 'posts.read_9', titleKey: 'posts.title_monolith'},
  'deploy-process-rework': {topicKey: 'posts.topic_devops', readKey: 'posts.read_6', titleKey: 'posts.title_deploy'},
  'memory-tests-memlab': {topicKey: 'posts.topic_testing', readKey: 'posts.read_5', titleKey: 'posts.title_memlab'},
  'ai-augmented-dev': {topicKey: 'posts.topic_ai', readKey: 'posts.read_8', titleKey: 'posts.title_ai'},
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

export default async function PostsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const items = getSortedItems('posts', locale);

  // Pre-resolve all localized strings server-side so the client component can
  // stay simple and the initial paint matches the SSR output.
  const resolved: PostsListItem[] = items.map((p) => {
    const meta = postMeta[p.id];
    return {
      id: p.id,
      date: p.date,
      title: meta ? (t.raw(meta.titleKey) as string) : p.title,
      topic: meta ? t(meta.topicKey) : '—',
      read: meta ? t(meta.readKey) : '',
      tags: p.tags ?? [],
    };
  });

  // Filter pills: "All" + a curated set of tags that map to friendly labels.
  // Only show pills whose tag actually exists in the registry — keeps the bar
  // tidy and avoids dead chips.
  const allTags = new Set(items.flatMap((p) => p.tags ?? []));
  const candidatePills: Array<{tag: string; label: string}> = [
    {tag: 'architecture', label: 'Architecture'},
    {tag: 'devops', label: 'DevOps'},
    {tag: 'ai', label: 'AI'},
    {tag: 'testing', label: 'Testing'},
    {tag: 'nextjs', label: 'Next.js'},
    {tag: 'react', label: 'React'},
  ];
  const filters: PostsFilter[] = [
    {tag: null, label: t('posts.filter_all')},
    ...candidatePills.filter((p) => allTags.has(p.tag)),
  ];

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

      <PostsList items={resolved} filters={filters} />

      <SiteFooter rightLabel="06 / Posts" />
    </div>
  );
}
