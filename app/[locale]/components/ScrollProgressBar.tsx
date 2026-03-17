'use client';

import {useEffect, useState} from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, (window.scrollY / scrollHeight) * 100));
      }
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-blue-600 dark:bg-blue-400 transition-[width] duration-150"
      style={{width: `${progress}%`}}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
