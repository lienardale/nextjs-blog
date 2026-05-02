'use client';

import {useEffect, useRef, type ReactNode} from 'react';

type Sticker = {
  className: string;
  rot: string;
  x: number;
  y: number;
  cursor?: string;
  children: ReactNode;
};

export default function Scrapbook({stickers}: {stickers: Sticker[]}) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cleanups: Array<() => void> = [];

    stage.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
      let sx = 0;
      let sy = 0;
      let ox = 0;
      let oy = 0;
      let dragging = false;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        sx = e.clientX;
        sy = e.clientY;
        const t = el.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        ox = t ? parseFloat(t[1]) : 0;
        oy = t ? parseFloat(t[2]) : 0;
        el.classList.add('is-dragging');
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const nx = ox + (e.clientX - sx);
        const ny = oy + (e.clientY - sy);
        const rot = el.getAttribute('data-rot') ?? '0deg';
        el.style.transform = `translate(${nx}px, ${ny}px) rotate(${rot})`;
      };
      const onUp = () => {
        dragging = false;
        el.classList.remove('is-dragging');
      };

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
      cleanups.push(() => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="scrapbook" ref={stageRef}>
      {stickers.map((s, i) => (
        <div
          key={i}
          className={`scrap ${s.className}`}
          data-drag
          data-rot={s.rot}
          data-cursor={s.cursor ?? 'drag'}
          style={{transform: `translate(${s.x}px, ${s.y}px) rotate(${s.rot})`}}
        >
          {s.children}
        </div>
      ))}
    </div>
  );
}
