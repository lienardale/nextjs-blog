export default function TagPill({tag}: {tag: string}) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-accent-soft text-accent">
      {tag}
    </span>
  );
}
