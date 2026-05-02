'use client';

import {useEffect, useRef} from 'react';

export default function CursorFollower() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !ring || !label) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.setProperty('--x', `${mx}px`);
      root.style.setProperty('--y', `${my}px`);
    };
    const onDown = () => root.classList.add('is-pressed');
    const onUp = () => root.classList.remove('is-pressed');

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) raf = requestAnimationFrame(tick);

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest('[data-cursor]');
      if (t) {
        root.classList.add('is-hover');
        const text = t.getAttribute('data-cursor') ?? '';
        label.textContent = text;
        root.classList.toggle('has-label', !!text);
      }
    };
    const onOut = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest('[data-cursor]');
      if (t) {
        root.classList.remove('is-hover');
        root.classList.remove('has-label');
        label.textContent = '';
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-follower" aria-hidden>
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className="cursor-ring" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
