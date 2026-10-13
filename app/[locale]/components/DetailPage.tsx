import {type ReactNode} from 'react';
import {Link} from '../../../lib/i18n/navigation';
import Breadcrumbs from './Breadcrumbs';

type Props = {
  /** Section the detail belongs to (e.g. "experience"). Used to resolve crumbs and the back link. */
  section: 'experience' | 'education' | 'about_me' | 'hobbies' | 'skills';
  /** Localized label for the section ("Experience", "Education", …). */
  sectionLabel: string;
  /** Localized index label ("Index"). */
  indexLabel: string;
  /** Mono line above the title: date range and place ("2022 → present · Paris"). */
  eyebrow?: string;
  /** Company or school name, plain text. */
  title: string;
  /** Role held, or degree for education. */
  subtitle?: string;
  /** Optional summary block rendered above the body. */
  summary?: ReactNode;
  /** Article body — already React JSX. */
  body: ReactNode;
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
  subtitle,
  summary,
  body,
}: Props) {
  const sectionHref = sectionToHref[section];

  return (
    <article className="flex flex-col gap-7">
      <Breadcrumbs
        items={[
          {label: indexLabel, href: '/'},
          {label: sectionLabel, href: sectionHref},
          {label: title},
        ]}
      />

      <div className="flex flex-col gap-2">
        {eyebrow ? <span className="font-mono text-[11px] text-ink-muted">{eyebrow}</span> : null}
        <h1 className="page-h1">{title}</h1>
        {subtitle ? <span className="text-[14px] text-ink-muted">{subtitle}</span> : null}
      </div>

      {summary ? <div className="detail-summary">{summary}</div> : null}

      <div className="prose-detail">{body}</div>

      <Link href={sectionHref} className="link-muted self-start text-[13px]">
        ← {sectionLabel}
      </Link>
    </article>
  );
}
