'use client';

import {useEffect, useState} from 'react';
import {ChevronUpIcon} from '@heroicons/react/24/solid';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-accent text-accent-fg shadow-lg transition-all duration-300 hover:opacity-90 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
}
