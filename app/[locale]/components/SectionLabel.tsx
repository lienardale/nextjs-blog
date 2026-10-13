import type {ReactNode} from 'react';

// Mono label that sits above a list of rows, with an optional right-aligned
// aside (usually a "see all →" link or a note).
export default function SectionLabel({children, aside}: {children: ReactNode; aside?: ReactNode}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
      <h2 className="section-label">{children}</h2>
      {aside}
    </div>
  );
}
