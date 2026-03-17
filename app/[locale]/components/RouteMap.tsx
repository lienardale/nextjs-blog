'use client';

import {useEffect, useRef} from 'react';
import {MapContainer, TileLayer, Polyline, useMap} from 'react-leaflet';
import type {LatLngBoundsExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  waypoints: [number, number][];
  title?: string;
};

function FitBounds({waypoints}: {waypoints: [number, number][]}) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (waypoints.length > 0 && !fitted.current) {
      fitted.current = true;
      map.fitBounds(waypoints as LatLngBoundsExpression, {padding: [20, 20]});
    }
  }, [map, waypoints]);

  return null;
}

export default function RouteMap({waypoints, title}: Props) {
  if (waypoints.length === 0) return null;

  const center = waypoints[Math.floor(waypoints.length / 2)];

  return (
    <div data-testid="route-map" className="w-full h-[300px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={waypoints} color="#3b82f6" weight={3} opacity={0.8} />
        <FitBounds waypoints={waypoints} />
      </MapContainer>
    </div>
  );
}
