'use client';

import {useEffect, useRef, useState} from 'react';

type DurationItem = {
  title: string;
  startDate: string;
  endDate: string;
};

type Props = {
  items: DurationItem[];
  color?: 'blue' | 'green';
};

function monthsDiff(start: string, end: string): number {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  return (ey - sy) * 12 + (em - sm);
}

function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (remainingMonths > 0) parts.push(`${remainingMonths} mo`);
  return parts.join(' ') || '< 1 mo';
}

export default function DurationBars({items, color = 'blue'}: Props) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {threshold: 0.2}
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const durations = items.map((item) => ({
    ...item,
    months: monthsDiff(item.startDate, item.endDate),
  }));

  const maxMonths = Math.max(...durations.map((d) => d.months));

  const barColor = color === 'green'
    ? 'bg-green-500 dark:bg-green-400'
    : 'bg-accent';

  const bgColor = color === 'green'
    ? 'bg-green-100 dark:bg-green-900/30'
    : 'bg-accent-soft';

  return (
    <div ref={containerRef} className="space-y-3" data-testid="duration-bars">
      {durations.map((item) => {
        const pct = maxMonths > 0 ? (item.months / maxMonths) * 100 : 0;
        return (
          <div key={item.title}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-ink">{item.title}</span>
              <span className="text-ink-muted">
                {item.startDate} — {item.endDate} ({formatDuration(item.months)})
              </span>
            </div>
            <div className={`h-3 rounded-full ${bgColor} overflow-hidden`}>
              <div
                className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
                style={{width: visible ? `${pct}%` : '0%'}}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
