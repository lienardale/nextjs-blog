import {type ReactNode} from 'react';
import {Link} from '../../../lib/i18n/navigation';
import SiteFooter from './SiteFooter';

type Props = {
  /** Section the detail belongs to (e.g. "experience"). Used to resolve crumbs and the back link. */
  section: 'experience' | 'education' | 'about_me' | 'hobbies' | 'skills';
  /** Localized label for the section ("Experience", "Education", …). */
  sectionLabel: string;
  /** Localized index label ("Index"). */
  indexLabel: string;
  /** "// 01 · technical mode" style mono eyebrow. */
  eyebrow?: string;
  /** Display title. May contain HTML (`<em>`, `<br/>`). */
  title: string;
  /** One-line subtitle in the section-head right column (date range, location, etc.). */
  meta?: string;
  /** Optional summary block rendered above the body. */
  summary?: ReactNode;
  /** Article body — already React JSX. */
  body: ReactNode;
  /** Footer right-side label (e.g. "01 · Junior 42 Paris"). */
  footerLabel?: string;
};

const sectionToHref: Record<Props['section'], string> = {
  experience: '/experience',
  education: '/education',
  about_me: '/about_me',
  hobbies: '/about_me',
  skills: '/skills',
};

export default function DetailPage({
  section,
  sectionLabel,
  indexLabel,
  eyebrow,
  title,
  meta,
  summary,
  body,
  footerLabel,
}: Props) {
  const sectionHref = sectionToHref[section];

  return (
    <div className="section-page narrow detail-page">
      <div className="crumbs">
        <Link href="/">{indexLabel}</Link> /{' '}
        <Link href={sectionHref}>{sectionLabel}</Link> /{' '}
        <span dangerouslySetInnerHTML={{__html: stripTags(title)}} />
      </div>

      <div className="section-head">
        <div>
          {eyebrow ? <span className="kind">{eyebrow}</span> : null}
          <h1 data-reveal dangerouslySetInnerHTML={{__html: title}} />
        </div>
        {meta ? <div className="kind">{meta}</div> : null}
      </div>

      {summary ? <div className="detail-summary" data-reveal>{summary}</div> : null}

      <article className="detail-article" data-reveal style={{['--d' as string]: 1} as React.CSSProperties}>
        {body}
      </article>

      <SiteFooter rightLabel={footerLabel} />
    </div>
  );
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
