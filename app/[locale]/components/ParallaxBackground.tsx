'use client';

import React, {useEffect, useState, useRef, useCallback} from 'react';

const PARALLAX_IMAGE_URL =
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80';

const MOBILE_QUERY = '(max-width: 768px)';

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: 'header' | 'section' | 'div';
  speed?: number;
};

export default function ParallaxBackground({
  children,
  className = '',
  as: Tag = 'div',
  speed = 0.4,
}: Props): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // Detect mobile via matchMedia
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Scroll-driven parallax for mobile
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      const bg = bgRef.current;
      if (container && bg) {
        const rect = container.getBoundingClientRect();
        const offset = -rect.top * speed;
        bg.style.transform = `translateY(${offset}px)`;
      }
      ticking.current = false;
    });
  }, [speed]);

  useEffect(() => {
    if (!isMobile) return;

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll(); // initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, handleScroll]);

  // Desktop: pure CSS parallax via bg-fixed
  if (!isMobile) {
    return (
      <Tag className={`${className} bg-fixed bg-center bg-cover custom-img`}>
        {children}
      </Tag>
    );
  }

  // Mobile: JS-driven parallax with positioned background div
  return (
    <Tag
      ref={containerRef as any}
      className={`${className} relative overflow-hidden`}
    >
      <div
        ref={bgRef}
        data-testid="parallax-bg"
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url("${PARALLAX_IMAGE_URL}")`,
          height: `${100 + 100 * speed}%`,
          top: `${-50 * speed}%`,
          willChange: 'transform',
        }}
      />
      <div className="relative z-1">
        {children}
      </div>
    </Tag>
  );
}
