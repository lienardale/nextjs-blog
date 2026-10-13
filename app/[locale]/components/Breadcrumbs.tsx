import {Fragment} from 'react';
import {Link} from '../../../lib/i18n/navigation';

export type Crumb = {label: string; href?: string};

// "Index / Experience / Wiremind". Items with an href are links; an item
// without one is the current page.
export default function Breadcrumbs({items}: {items: Crumb[]}) {
  return (
    <div className="flex flex-wrap gap-1.5 text-[12px] text-ink-muted">
      {items.map((item, i) => (
        <Fragment key={`${i}-${item.label}`}>
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="link-muted">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-soft" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
