'use client';

export type Filter = {tag: string | null; label: string};

// Filter pills on the left; sort toggle and result count on the right.
// Shared by the posts and projects lists.
export default function FilterBar({
  filters,
  activeTag,
  onSelect,
  filterLabel,
  sortLabel,
  onToggleSort,
  countLabel,
}: {
  filters: Filter[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
  /** Accessible name for the group of pills. */
  filterLabel: string;
  sortLabel: string;
  onToggleSort: () => void;
  countLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={filterLabel}>
        {filters.map((filter) => {
          const isActive = activeTag === filter.tag;
          return (
            <button
              key={filter.tag ?? 'all'}
              type="button"
              className="pill"
              aria-pressed={isActive}
              onClick={() => onSelect(filter.tag)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <div className="flex items-baseline gap-[14px] text-[12px] text-ink-muted">
        <button type="button" className="link-muted" onClick={onToggleSort}>
          {sortLabel}
        </button>
        <span className="font-mono text-[11px]" aria-live="polite">
          {countLabel}
        </span>
      </div>
    </div>
  );
}
