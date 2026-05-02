'use client';

import {useState} from 'react';

export type Trip = {
  id: string;
  yearLabel: string;
  name: string;
  km: string;
  days: string;
  year: string;
};

export default function TripExpand({trip, delay = 0}: {trip: Trip; delay?: number}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="trip is-interactive"
        data-cursor="expand"
        data-reveal
        aria-expanded={open}
        style={{['--d' as string]: delay} as React.CSSProperties}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="t-head">
          <span>Trip / {trip.yearLabel}</span>
          <span className="komoot-tag">Komoot ↗</span>
        </div>
        <div className="t-name" dangerouslySetInnerHTML={{__html: trip.name}} />
        <div className="t-stats">
          <div><b>{trip.km}</b>km</div>
          <div><b>{trip.days}</b>{trip.days === '1' ? 'day' : 'days'}</div>
          <div><b>{trip.year}</b></div>
        </div>
        <div className="t-expand-cue">
          <span className="t-expand-chev" aria-hidden>▾</span>
          <span className="t-expand-label">{open ? 'Hide map' : 'Show map'}</span>
        </div>
      </button>
      {open ? (
        <div className="trip-panel">
          <div className="trip-panel-head">
            <span className="trip-panel-title" dangerouslySetInnerHTML={{__html: trip.name.replace(/<\/?em>/g, '')}} />
            <a
              className="trip-panel-open"
              href={`https://www.komoot.com/tour/${trip.id}`}
              target="_blank"
              rel="noopener"
            >
              Open on Komoot ↗
            </a>
          </div>
          <div className="trip-panel-map">
            <iframe
              src={`https://www.komoot.com/tour/${trip.id}/embed?profile=1`}
              title={`Komoot tour ${trip.id}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
