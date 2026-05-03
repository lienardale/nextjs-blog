'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/i18n/navigation';

export type PostsListItem = {
  id: string;
  date: string;
  title: string;
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
      <div className="post-meta-bar" data-reveal>
        <div className="filters" role="tablist" aria-label="Filter posts by topic">
          {filters.map((p) => {
            const isActive = activeTag === p.tag;
            return (
              <button
                key={p.tag ?? 'all'}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? 'is-active' : ''}
                onClick={() => setActiveTag(p.tag)}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="sort"
          aria-label="Toggle sort order"
          onClick={() => setNewestFirst((v) => !v)}
        >
          {newestFirst ? t('sort_newest') : t('sort_oldest')}
        </button>
        <span aria-live="polite">{t('results', {count: filtered.length})}</span>
      </div>

      <div className="posts-list">
        {filtered.map((p, i) => (
          <Link
            key={p.id}
            href={`/posts/${p.id}`}
            className="post-row"
            data-cursor="read"
            data-reveal
            style={{['--d' as string]: i} as React.CSSProperties}
          >
            <span className="yr">{fmtYear(p.date)}</span>
            <h3 dangerouslySetInnerHTML={{__html: p.title}} />
            <span className="topic">{p.topic}</span>
            <span className="read">{p.read}</span>
          </Link>
        ))}
        {filtered.length === 0 ? (
          <p className="posts-empty">{t('empty')}</p>
        ) : null}
      </div>
    </>
  );
}
