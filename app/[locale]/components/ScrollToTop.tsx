'use client';

import {useEffect, useState} from 'react';
import {ArrowUpIcon} from '@heroicons/react/24/outline';

const SHOW_AFTER_PX = 480;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className={`fixed bottom-5 right-5 z-40 flex size-9 items-center justify-center rounded-full border border-rule bg-bg text-ink-soft transition-[opacity,color,border-color] duration-[180ms] hover:border-ink-muted hover:text-ink ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="size-[15px]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
