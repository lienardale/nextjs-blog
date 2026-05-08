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
      const DRAG_THRESHOLD = 5; // px before pointer-down is treated as a drag
      let sx = 0;
      let sy = 0;
      let ox = 0;
      let oy = 0;
      let armed = false;
      let dragging = false;
      let pid = -1;

      const onDown = (e: PointerEvent) => {
        armed = true;
        dragging = false;
        pid = e.pointerId;
        sx = e.clientX;
        sy = e.clientY;
        const t = el.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        ox = t ? parseFloat(t[1]) : 0;
        oy = t ? parseFloat(t[2]) : 0;
        // Note: pointer not captured here — wait for movement so clicks on
        // inner links/buttons still propagate when the user doesn't drag.
      };
      const onMove = (e: PointerEvent) => {
        if (!armed) return;
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        if (!dragging && Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) {
          dragging = true;
          el.setPointerCapture(pid);
          el.classList.add('is-dragging');
        }
        if (dragging) {
          const rot = el.getAttribute('data-rot') ?? '0deg';
          el.style.transform = `translate(${ox + dx}px, ${oy + dy}px) rotate(${rot})`;
        }
      };
      const onUp = () => {
        armed = false;
        if (dragging) {
          dragging = false;
          el.classList.remove('is-dragging');
        }
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
