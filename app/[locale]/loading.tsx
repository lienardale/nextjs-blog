const ROW_WIDTHS = ['72%', '58%', '66%', '48%'];

export default function Loading() {
  return (
    <div className="flex flex-col gap-10" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col gap-3">
        <span className="sk h-8 w-48" />
        <span className="sk h-3.5 w-72 max-w-full" />
      </div>
      <div>
        {ROW_WIDTHS.map((width) => (
          <div key={width} className="border-t border-rule py-[18px]">
            <span className="sk h-3.5" style={{width}} />
          </div>
        ))}
      </div>
    </div>
  );
}
