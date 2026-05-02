'use client';

import {useState, useId, type ReactNode} from 'react';
import {useTranslations} from 'next-intl';

type Props = {
  summary: ReactNode;
  children: ReactNode;
};

export default function ExpandableCard({summary, children}: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const t = useTranslations();

  return (
    <div className="expandable-card">
      <div className="ec-summary">{summary}</div>
      <div
        id={contentId}
        role="region"
        className={`ec-grid ${expanded ? 'is-expanded' : 'is-collapsed'}`}
      >
        <div className="ec-body-wrap">
          <div className="ec-body">{children}</div>
        </div>
      </div>
      <button
        type="button"
        className="ec-toggle"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>{expanded ? t('show_less') : t('show_more')}</span>
        <span className="chev" aria-hidden>▾</span>
      </button>
    </div>
  );
}
