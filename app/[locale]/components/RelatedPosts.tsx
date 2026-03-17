import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {getRelatedPosts} from '../../../lib/registry';
import TagPill from './TagPill';

type Props = {
  postId: string;
  locale: string;
};

export default function RelatedPosts({postId, locale}: Props) {
  const t = useTranslations();
  const related = getRelatedPosts(postId, locale);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t('related_posts')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/posts/${post.id}`}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors no-underline"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
            {post.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {post.description}
              </p>
            )}
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
