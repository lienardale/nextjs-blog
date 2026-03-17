'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState, type ReactNode} from 'react';

export default function PageTransition({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const prevPathnameRef = useRef(pathname);
  const hasMounted = useRef(false);

  useEffect(() => {
    // Skip the first effect run (initial mount / hydration) to avoid
    // a flash of opacity-0 when server and client pathnames differ
    // (e.g. next-intl strips the locale prefix for the default locale).
    if (!hasMounted.current) {
      hasMounted.current = true;
      prevPathnameRef.current = pathname;
      return;
    }

    if (pathname !== prevPathnameRef.current) {
      setIsVisible(false);
      prevPathnameRef.current = pathname;
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
