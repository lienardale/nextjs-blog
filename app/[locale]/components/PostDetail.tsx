import {type ReactNode} from 'react';
import {Link} from '../../../lib/i18n/navigation';
import ReadingTime from './ReadingTime';
import SiteFooter from './SiteFooter';
import TableOfContents from './TableOfContents';

type Props = {
  postIndex: string;
  title: string;
  titleHTML?: string;
  date: string;
  readingMinutes: number;
  bylineMonth?: string;
  body: ReactNode;
};

export default function PostDetail({
  postIndex,
  title,
  titleHTML,
  date,
  readingMinutes,
  bylineMonth,
  body,
}: Props) {
  const month = bylineMonth ?? new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'});

  return (
    <>
      <div className="post-hero" data-reveal>
        <span className="kind">// Posts / {postIndex} · <ReadingTime minutes={readingMinutes} /> · {new Date(date).getFullYear()}</span>
        {titleHTML ? (
          <h1 dangerouslySetInnerHTML={{__html: titleHTML}} />
        ) : (
          <h1>{title}</h1>
        )}
        <div className="byline">
          <span>by Alexandre Lienard</span>
          <span>—</span>
          <span>{month}</span>
        </div>
      </div>

      <div className="post-layout">
        <aside>
          <TableOfContents />
        </aside>
        <article className="article" data-reveal>
          {body}
        </article>
        <div />
      </div>

      <div style={{maxWidth: 1280, margin: '0 auto', padding: '0 36px'}}>
        <SiteFooter
          rightLabel={`${postIndex} / Posts`}
        />
      </div>
      <div style={{textAlign: 'center', padding: '8px 0 32px'}}>
        <Link href="/posts" data-cursor="back" className="mono" style={{fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)'}}>
          ← back to posts
        </Link>
      </div>
    </>
  );
}
