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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Summary — always visible */}
      <div className="p-4 text-gray-700 dark:text-gray-300">{summary}</div>

      {/* Expandable content */}
      <div
        id={contentId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0">{children}</div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-center gap-2 p-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-200 dark:border-gray-700"
      >
        <span>{expanded ? t('show_less') : t('show_more')}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
