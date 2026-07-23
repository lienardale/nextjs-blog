type Props = {
  totalTrips: number;
  totalKm: number;
  totalDays: number;
  labels: {trips: string; km: string; days: string};
};

export default function TripSummary({totalTrips, totalKm, totalDays, labels}: Props) {
  return (
    <div data-testid="trip-summary" className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      <div className="text-center p-4 rounded-lg bg-bg-alt">
        <div className="text-3xl font-bold text-accent">{totalTrips}</div>
        <div className="text-sm text-ink-muted">{labels.trips}</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-bg-alt">
        <div className="text-3xl font-bold text-accent">{totalKm.toLocaleString()}</div>
        <div className="text-sm text-ink-muted">{labels.km}</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-bg-alt">
        <div className="text-3xl font-bold text-accent">{totalDays}</div>
        <div className="text-sm text-ink-muted">{labels.days}</div>
      </div>
    </div>
  );
}
