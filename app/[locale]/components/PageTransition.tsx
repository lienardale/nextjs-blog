'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useState, type ReactNode} from 'react';

export default function PageTransition({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsVisible(false);
      setPrevPathname(pathname);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, prevPathname]);

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
