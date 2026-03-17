export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-[144px] h-[144px] rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      {/* Banner skeleton */}
      <div className="h-30 mb-5 bg-gray-200 dark:bg-gray-700 rounded" />
      {/* Text skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
      {/* Section skeletons */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-5" />
      ))}
    </div>
  );
}
