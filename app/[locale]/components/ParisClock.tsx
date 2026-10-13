'use client';

import {useEffect, useState} from 'react';

// Always the Europe/Paris wall clock (which Marseille shares), whatever
// zone the visitor is in.
const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
});

export default function ParisClock() {
  const [time, setTime] = useState('—');

  useEffect(() => {
    const paint = () => setTime(formatter.format(new Date()));
    paint();
    const id = setInterval(paint, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
