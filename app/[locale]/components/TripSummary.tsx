type Props = {
  totalTrips: number;
  totalKm: number;
  totalDays: number;
  labels: {trips: string; km: string; days: string};
};

export default function TripSummary({totalTrips, totalKm, totalDays, labels}: Props) {
  return (
    <div data-testid="trip-summary" className="grid grid-cols-3 gap-4 my-6">
      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalTrips}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{labels.trips}</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalKm.toLocaleString()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{labels.km}</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalDays}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{labels.days}</div>
      </div>
    </div>
  );
}
