'use client';

import {useRef, type ReactNode} from 'react';

export default function ProjectCardTilt({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.setProperty('--rx', `${(py - 0.5) * -8}deg`);
    card.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
  };
  const onLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className="proj-card"
      data-reveal
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{['--d' as string]: delay} as React.CSSProperties}
    >
      {children}
    </article>
  );
}
