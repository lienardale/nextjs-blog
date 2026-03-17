'use client';

import {useState, lazy, Suspense} from 'react';

const KomootEmbed = lazy(() => import('./KomootEmbed'));
const RouteMap = lazy(() => import('./RouteMap'));

type Props = {
  route: string;
  year: number;
  days: number;
  km: number;
  komootTourId?: string;
  waypoints?: [number, number][];
  dayLabel: string;
};

export default function TripCard({route, year, days, km, komootTourId, waypoints, dayLabel}: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMap = !!(komootTourId || (waypoints && waypoints.length > 0));

  return (
    <div
      data-testid="trip-card"
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      <button
        type="button"
        onClick={() => hasMap && setExpanded((prev) => !prev)}
        className={`w-full text-left p-4 ${hasMap ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''} transition-colors`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{route}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {year}
          </span>
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{days} {dayLabel}</span>
          <span>{km} km</span>
        </div>
        {hasMap && (
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {expanded ? '' : komootTourId ? 'Komoot' : 'Map'}
          </div>
        )}
      </button>

      {expanded && hasMap && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <Suspense
            fallback={
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                Loading map...
              </div>
            }
          >
            {komootTourId ? (
              <KomootEmbed tourId={komootTourId} title={route} />
            ) : waypoints ? (
              <RouteMap waypoints={waypoints} title={route} />
            ) : null}
          </Suspense>
        </div>
      )}
    </div>
  );
}
