import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/i18n/navigation';
import {getRelatedPosts} from '../../../lib/registry';
import SectionLabel from './SectionLabel';

type Props = {
  postId: string;
  locale: string;
};

export default function RelatedPosts({postId, locale}: Props) {
  const t = useTranslations();
  const related = getRelatedPosts(postId, locale);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-rule pt-6">
      <SectionLabel>{t('related_posts')}</SectionLabel>
      {related.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="row flex flex-col gap-1">
          <span className="text-[15px]">{post.title}</span>
          {post.description ? (
            <span className="text-pretty text-[13px] text-ink-muted">{post.description}</span>
          ) : null}
          <span className="font-mono text-[11px] text-ink-muted">
            {[post.date, ...post.tags].join(' · ')}
          </span>
        </Link>
      ))}
    </section>
  );
}
