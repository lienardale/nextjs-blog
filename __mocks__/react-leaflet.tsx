import React from 'react';

export function MapContainer({children, ...props}: {children: React.ReactNode; [key: string]: unknown}) {
  return <div data-testid="map-container" {...props}>{children}</div>;
}

export function TileLayer(props: Record<string, unknown>) {
  return <div data-testid="tile-layer" {...props} />;
}

export function Polyline(props: Record<string, unknown>) {
  return <div data-testid="polyline" {...props} />;
}

export function useMap() {
  return {
    fitBounds: () => {},
    setView: () => {},
  };
}
