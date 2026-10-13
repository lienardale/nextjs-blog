'use client';

import {usePathname} from 'next/navigation';
import {useLayoutEffect, useRef, useState, type ReactNode} from 'react';

// Fades each incoming page in. The animation itself is CSS (.route-fade in
// globals.css) and runs on whatever element becomes the page root, so it
// also plays when streamed content replaces the loading skeleton. This
// component only decides *when* that rule applies: never on first load —
// the server-rendered page should simply be there — and from the first
// navigation onwards.
export default function PageTransition({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);
  const [armed, setArmed] = useState(false);

  // A layout effect, so the class lands before the new page is painted.
  useLayoutEffect(() => {
    if (pathname !== initialPathname.current) setArmed(true);
  }, [pathname]);

  return <div className={armed ? 'route-fade' : undefined}>{children}</div>;
}
