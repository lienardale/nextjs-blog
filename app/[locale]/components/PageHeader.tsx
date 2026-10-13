import type {ReactNode} from 'react';

// Page title block: the one display-size heading on a page, plus an
// optional muted lede.
export default function PageHeader({title, lede}: {title: string; lede?: ReactNode}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="page-h1">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  );
}
