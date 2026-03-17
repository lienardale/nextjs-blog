'use client';

import {useRef, useState, type ReactNode} from 'react';

export default function TiltCard({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)'});

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)'});
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
