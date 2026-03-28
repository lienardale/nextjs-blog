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
  speed = 0,
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
  // Simulates background-attachment:fixed — the background is pinned to the
  // viewport so all sections act as windows into one continuous backdrop.
  // We counteract the container's scroll movement by translating the background
  // by -rect.top, keeping it viewport-aligned.
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      const bg = bgRef.current;
      if (container && bg) {
        const rect = container.getBoundingClientRect();
        // Pin background to viewport: fully counteract container scroll.
        // speed controls slight drift: 0 = fully fixed, 1 = no parallax.
        const offset = -rect.top * (1 - speed);
        bg.style.transform = `translateY(${offset}px)`;
      }
      ticking.current = false;
    });
  }, [speed]);

  useEffect(() => {
    if (!isMobile) return;

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll(); // initial position

    // Also recalculate when content resizes (e.g. dropdown expands in a
    // sibling section, pushing this one down). Observing document.body
    // catches any layout shift on the page.
    const observer = new ResizeObserver(handleScroll);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isMobile, handleScroll]);

  // Desktop: pure CSS parallax via bg-fixed
  if (!isMobile) {
    return (
      <Tag className={`${className} bg-fixed bg-center bg-cover custom-img`}>
        {children}
      </Tag>
    );
  }

  // Mobile: JS-driven parallax with positioned background div.
  // The background div is sized to the full viewport height so it always
  // fills the container (mirroring how bg-fixed covers the viewport),
  // and min-h-32 ensures tiny sections still show enough background.
  return (
    <Tag
      ref={containerRef as any}
      className={`${className} relative overflow-hidden min-h-32`}
    >
      <div
        ref={bgRef}
        data-testid="parallax-bg"
        className="absolute left-0 right-0 bg-center bg-cover"
        style={{
          backgroundImage: `url("${PARALLAX_IMAGE_URL}")`,
          height: '100vh',
          top: 0,
          willChange: 'transform',
        }}
      />
      <div className="relative z-1">
        {children}
      </div>
    </Tag>
  );
}
