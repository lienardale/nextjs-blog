import React from 'react';

// Mock geography data matching the countries used in WorldMap
const MOCK_GEOS = [
  {rsmKey: 'france', id: '250', properties: {name: 'France'}},
  {rsmKey: 'belgium', id: '056', properties: {name: 'Belgium'}},
  {rsmKey: 'canada', id: '124', properties: {name: 'Canada'}},
  {rsmKey: 'congo', id: '180', properties: {name: 'Dem. Rep. Congo'}},
  {rsmKey: 'cameroon', id: '120', properties: {name: 'Cameroon'}},
  {rsmKey: 'uk', id: '826', properties: {name: 'United Kingdom'}},
  {rsmKey: 'usa', id: '840', properties: {name: 'United States of America'}},
  {rsmKey: 'australia', id: '036', properties: {name: 'Australia'}},
  {rsmKey: 'india', id: '356', properties: {name: 'India'}},
  {rsmKey: 'south_africa', id: '710', properties: {name: 'South Africa'}},
  // Non-interactive countries
  {rsmKey: 'brazil', id: '076', properties: {name: 'Brazil'}},
  {rsmKey: 'china', id: '156', properties: {name: 'China'}},
];

export function ComposableMap({children, ...props}: {children: React.ReactNode; [key: string]: unknown}) {
  const {projection, projectionConfig, ...svgProps} = props;
  return <svg {...svgProps}>{children}</svg>;
}

export function Geographies({children}: {children: (args: {geographies: typeof MOCK_GEOS}) => React.ReactNode; geography: unknown}) {
  return <>{children({geographies: MOCK_GEOS})}</>;
}

export function Geography({geography, style, ...props}: {geography: {rsmKey: string; id: string}; style?: unknown; [key: string]: unknown}) {
  return <path data-geo-id={geography.id} {...props} />;
}

export function Sphere(props: Record<string, unknown>) {
  return <circle data-testid="map-sphere" {...props} />;
}

export function Graticule(props: Record<string, unknown>) {
  return <line data-testid="map-graticule" {...props} />;
}

export function createCoordinates(lon: number, lat: number): [number, number] {
  return [lon, lat];
}
