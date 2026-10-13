'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/i18n/navigation';
import FilterBar from './FilterBar';

export type PostsListItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  topic: string;
  read: string;
  tags: string[];
};

export type PostsFilter = {
  tag: string | null; // null = "All"
  label: string;
};

function fmtYear(date: string): string {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()} · ${m}`;
}

export default function PostsList({
  items,
  filters,
}: {
  items: PostsListItem[];
  filters: PostsFilter[];
}) {
  const t = useTranslations('posts');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [newestFirst, setNewestFirst] = useState(true);

  const filtered = useMemo(() => {
    const base = activeTag === null ? items : items.filter((p) => p.tags.includes(activeTag));
    return [...base].sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [items, activeTag, newestFirst]);

  return (
    <>
      <FilterBar
        filters={filters}
        activeTag={activeTag}
        onSelect={setActiveTag}
        filterLabel="Filter posts by topic"
        sortLabel={newestFirst ? t('sort_newest') : t('sort_oldest')}
        onToggleSort={() => setNewestFirst((v) => !v)}
        countLabel={t('results', {count: filtered.length})}
      />

      <div>
        {filtered.map((p) => (
          <Link key={p.id} href={`/posts/${p.id}`} className="row grid-cols-[72px_minmax(0,1fr)_auto]">
            <span className="font-mono text-[11px] text-ink-muted">{fmtYear(p.date)}</span>
            <span className="flex flex-col gap-0.5">
              <h3 className="text-[15px] font-normal">{p.title}</h3>
              {p.description ? (
                <span className="text-pretty text-[13px] text-ink-muted">{p.description}</span>
              ) : null}
            </span>
            <span className="flex flex-col items-end text-[12px] leading-[1.5] text-ink-muted">
              <span>{p.topic}</span>
              <span>{p.read}</span>
            </span>
          </Link>
        ))}
        {filtered.length === 0 ? (
          <p className="border-t border-rule py-6 text-[14px] text-ink-muted">{t('empty')}</p>
        ) : null}
      </div>
    </>
  );
}
