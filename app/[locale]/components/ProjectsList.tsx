'use client';

import {useMemo, useState} from 'react';
import {useTranslations} from 'next-intl';
import FilterBar from './FilterBar';
import ProjectCard from './ProjectCard';

export type ProjectsListItem = {
  id: string;
  date: string;
  name: string;
  /** Repository name, shown under the display name. */
  title: string;
  /** "solo" / "5 contrib" */
  stamp: string;
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

  const labels = {live: t('live'), lines: t('lines'), commits: t('commits')};

  return (
    <>
      <FilterBar
        filters={filters}
        activeTag={activeTag}
        onSelect={setActiveTag}
        filterLabel="Filter projects by tech"
        sortLabel={newestFirst ? t('sort_newest') : t('sort_oldest')}
        onToggleSort={() => setNewestFirst((v) => !v)}
        countLabel={t('results', {count: filtered.length})}
      />

      {filtered.length === 0 ? (
        <p className="py-6 text-[14px] text-ink-muted">{t('empty')}</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              labels={labels}
              project={{
                name: p.name,
                title: p.title,
                stamp: p.stamp,
                description: p.description,
                github: p.github,
                live: p.live,
                tech: p.tech,
                stats: p.stats,
                image: p.image,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
