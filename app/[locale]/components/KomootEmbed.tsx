'use client';

type Props = {
  tourId: string;
  title?: string;
};

export default function KomootEmbed({tourId, title}: Props) {
  return (
    <div data-testid="komoot-embed" className="w-full rounded-lg overflow-hidden">
      <iframe
        src={`https://www.komoot.com/tour/${tourId}/embed?profile=1`}
        width="100%"
        height="580"
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        title={title ?? `Komoot tour ${tourId}`}
        className="border-0"
      />
    </div>
  );
}
