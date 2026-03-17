'use client';

import {useEffect, useState} from 'react';

export default function TypingText({text, speed = 60}: {text: string; speed?: number}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">
        {displayed}
        <span
          className={`inline-block w-[2px] h-[1.1em] bg-white ml-0.5 align-middle ${
            done ? 'animate-blink' : ''
          }`}
        />
      </span>
    </span>
  );
}
