'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export type Trip = {
  /** Komoot tour id. Trips without one show `pathD` as a sketch instead. */
  id?: string;
  year: string;
  name: string;
  km: string;
  days: string;
  /** Route sketch for trips that predate the Komoot log (200×100 viewBox). */
  pathD?: string;
};

// The trip log: one row per trip, at most one open at a time.
export default function TripExpand({trips}: {trips: Trip[]}) {
  const t = useTranslations('about');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {trips.map((trip, i) => {
        const isOpen = openIndex === i;
        const panelId = `trip-panel-${i}`;
        return (
          <div key={`${trip.year}-${trip.name}`} className="border-t border-rule">
            <button
              type="button"
              className="grid w-full grid-cols-[44px_minmax(0,1fr)_auto_14px] items-baseline gap-4 py-3 text-left text-[14px] text-ink transition-colors duration-[180ms] hover:text-accent"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-mono text-[11px] text-ink-muted">{trip.year}</span>
              <span>{trip.name}</span>
              <span className="text-[12px] text-ink-muted">
                {trip.km} km · {trip.days} {trip.days === '1' ? t('trip_day') : t('trip_days')}
              </span>
              <span
                className={`text-center text-[10px] text-ink-muted transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {isOpen ? (
              <div id={panelId} className="flex flex-col gap-2 pb-4">
                {trip.id ? (
                  <>
                    <iframe
                      src={`https://www.komoot.com/tour/${trip.id}/embed?profile=1`}
                      title={trip.name}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allow="fullscreen"
                      className="block h-[420px] w-full rounded-lg border border-rule bg-bg-alt"
                    />
                    <a
                      href={`https://www.komoot.com/tour/${trip.id}`}
                      target="_blank"
                      rel="noopener"
                      className="link-muted self-end text-[12px]"
                    >
                      {t('open_komoot')}
                    </a>
                  </>
                ) : (
                  <svg
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                    className="block h-[120px] w-full rounded-lg border border-rule bg-bg-alt text-accent"
                    role="img"
                    aria-label={trip.name}
                  >
                    <path
                      d={trip.pathD}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
