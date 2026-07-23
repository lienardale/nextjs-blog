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
    <section className="mt-12 pt-8 border-t border-rule">
      <h2 className="text-xl font-bold mb-4 text-ink">
        {t('related_posts')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/posts/${post.id}`}
            className="block p-4 rounded-lg border border-rule hover:border-accent transition-colors no-underline"
          >
            <h3 className="font-semibold text-ink mb-1 text-sm">
              {post.title}
            </h3>
            <p className="text-xs text-ink-muted mb-2">{post.date}</p>
            {post.description && (
              <p className="text-sm text-ink-soft mb-3 line-clamp-2">
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
