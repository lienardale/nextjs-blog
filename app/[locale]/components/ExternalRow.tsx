import {useTranslations} from 'next-intl';
import type {ReactNode} from 'react';

// A whole-row link that leaves the site, ending in a ↗. http(s) targets open
// in a new tab and say so to screen readers (the arrow itself is decorative);
// mailto: and other schemes are handed to the browser as-is. Pass the row's
// grid-cols-[…] (with a final auto column for the arrow) through className.
export default function ExternalRow({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const t = useTranslations();
  const newTab = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={`row ${className}`}
    >
      {children}
      <span className="text-ink-muted">
        <span aria-hidden="true">↗</span>
        {newTab ? <span className="sr-only">{t('opens_new_tab')}</span> : null}
      </span>
    </a>
  );
}
