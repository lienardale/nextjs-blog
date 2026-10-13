import {type ReactNode} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '../../../lib/i18n/navigation';
import {getReadingMinutes} from '../../../lib/registry';
import Breadcrumbs from './Breadcrumbs';
import ReadingTime from './ReadingTime';
import TableOfContents from './TableOfContents';

type Props = {
  /** Registry id — the reading time is looked up from it. */
  postId: string;
  postIndex: string;
  title: string;
  date: string;
  body: ReactNode;
  /** Rendered between the body and the back link. */
  related?: ReactNode;
};

export default function PostDetail({postId, postIndex, title, date, body, related}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const month = new Date(date).toLocaleString(locale, {month: 'long', year: 'numeric', timeZone: 'UTC'});

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          {label: t('nav.index'), href: '/'},
          {label: t('nav.posts'), href: '/posts'},
        ]}
      />

      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[11px] text-ink-muted">
          {t('nav.posts')} / {postIndex} · {month} · <ReadingTime minutes={getReadingMinutes(postId)} />
        </span>
        <h1 className="page-h1 text-balance">{title}</h1>
        <span className="text-[13px] text-ink-muted">{t('posts.by')}</span>
      </div>

      <TableOfContents />

      {/* The only <article> on the page: TableOfContents reads its headings. */}
      <article className="prose-post">{body}</article>

      {related}

      <Link href="/posts" className="link-muted self-start text-[13px]">
        {t('posts.back')}
      </Link>
    </div>
  );
}
