'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {Link} from '../../../lib/i18n/navigation';

type TimelineEntry = {
  date: string;
  title: string;
  content: ReactNode;
  href?: string;
};

export default function Timeline({entries}: {entries: TimelineEntry[]}) {
  const [visible, setVisible] = useState<boolean[]>(() => entries.map(() => false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        observerEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisible((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {threshold: 0.15}
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [entries.length]);

  if (entries.length === 0) return null;

  return (
    <div className="relative">
      {/* Center line (desktop) / left line (mobile) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-bg-alt md:-translate-x-px" />

      {entries.map((entry, i) => {
        const isLeft = i % 2 === 0;

        const card = (
          <div className="p-4 rounded-lg border border-rule bg-paper shadow-sm hover:shadow-md hover:border-accent transition-all">
            <div className="text-sm text-ink-muted mb-1">{entry.date}</div>
            <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
            <div className="text-ink-soft text-sm">{entry.content}</div>
          </div>
        );

        const wrappedCard = entry.href ? (
          <Link href={entry.href} className="block no-underline">{card}</Link>
        ) : card;

        return (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-testid="timeline-entry"
            className={`relative mb-8 pl-10 md:pl-0 transition-all duration-500 ease-out ${
              visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${isLeft ? 'md:pr-[calc(50%+1rem)] md:text-right' : 'md:pl-[calc(50%+1rem)]'}`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-accent border-2 border-white z-10" />

            {wrappedCard}
          </div>
        );
      })}
    </div>
  );
}
