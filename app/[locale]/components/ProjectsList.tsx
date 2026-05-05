'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import ProjectCard from './ProjectCard';
import TiltCard from './TiltCard';

export type ProjectsListItem = {
  id: string;
  date: string;
  name: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  tags: string[];
  stats: {contributors: number; lines: number; commits: number};
  image?: string;
};

export type ProjectsFilter = {
  tag: string | null;
  label: string;
};

export default function ProjectsList({
  items,
  filters,
}: {
  items: ProjectsListItem[];
  filters: ProjectsFilter[];
}) {
  const t = useTranslations('projects');
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
        <div className="filters" role="tablist" aria-label="Filter projects by tech">
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

      {filtered.length === 0 ? (
        <p className="posts-empty">{t('empty')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <TiltCard key={p.id}>
              <ProjectCard
                project={{
                  name: p.name,
                  description: p.description,
                  github: p.github,
                  live: p.live,
                  tech: p.tech,
                  stats: p.stats,
                  image: p.image,
                }}
              />
            </TiltCard>
          ))}
        </div>
      )}
    </>
  );
}
