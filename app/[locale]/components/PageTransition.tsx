'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useState, type ReactNode} from 'react';

export default function PageTransition({children}: {children: ReactNode}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
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
