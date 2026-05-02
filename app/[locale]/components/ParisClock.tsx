'use client';

import {useEffect, useState} from 'react';

export default function ParisClock() {
  const [time, setTime] = useState('—');

  useEffect(() => {
    const paint = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };
    paint();
    const id = setInterval(paint, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
