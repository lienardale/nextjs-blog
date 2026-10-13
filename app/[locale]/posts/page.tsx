import {getTranslations} from 'next-intl/server';
import {getDraftListingMeta} from '../../../lib/draft-post-meta';
import {getSortedItems} from '../../../lib/registry';
import PageHeader from '../components/PageHeader';
import PostsList, {type PostsListItem, type PostsFilter} from '../components/PostsList';

// Topic label per published post. Draft topics live in lib/draft-post-meta.ts,
// deliberately outside the locale files so they aren't shipped to the browser.
const topicKeys: Record<string, string> = {
  'building-modern-blog': 'posts.topic_nextjs',
  'next-intl-guide': 'posts.topic_i18n',
  'typescript-react-patterns': 'posts.topic_react',
  'ssg-ssr': 'posts.topic_nextjs',
  'pre-rendering': 'posts.topic_nextjs',
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
  // stay simple and the initial paint matches the SSR output. Title,
  // description and reading time come straight from the registry — the same
  // values the post page shows.
  const resolved: PostsListItem[] = items.map((p) => {
    // Drafts only reach this map when draftsVisible, so this never runs publicly.
    const draft = getDraftListingMeta(p.id, locale);
    const topicKey = topicKeys[p.id];
    return {
      id: p.id,
      date: p.date,
      title: p.title,
      description: p.description ?? '',
      topic: draft?.topic ?? (topicKey ? t(topicKey) : '—'),
      read: p.readingMinutes ? t('reading_time', {minutes: p.readingMinutes}) : '',
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
    <div className="flex flex-col gap-8">
      <PageHeader title={t('nav.posts')} lede={t('posts.summary', {count: items.length})} />
      <PostsList items={resolved} filters={filters} />
    </div>
  );
}
