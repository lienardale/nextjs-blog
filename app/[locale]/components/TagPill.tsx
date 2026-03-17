export default function TagPill({tag}: {tag: string}) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
      {tag}
    </span>
  );
}
