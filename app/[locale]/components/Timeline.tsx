'use client';

import {useEffect, useState, type ReactNode} from 'react';

type TimelineEntry = {
  date: string;
  title: string;
  content: ReactNode;
};

export default function Timeline({entries}: {entries: TimelineEntry[]}) {
  const [visible, setVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const timers = entries.map((_, i) =>
      setTimeout(() => setVisible((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      }), 150 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [entries.length]);

  return (
    <div className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-600">
      {entries.map((entry, i) => (
        <div
          key={i}
          className={`mb-8 relative transition-all duration-500 ease-out ${
            visible[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900" />
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{entry.date}</div>
          <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
          <div className="text-gray-700 dark:text-gray-300">{entry.content}</div>
        </div>
      ))}
    </div>
  );
}
