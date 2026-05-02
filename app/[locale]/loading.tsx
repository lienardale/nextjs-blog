export default function Loading() {
  return (
    <div className="section-page" aria-busy="true" aria-label="Loading">
      <div className="skeleton-crumbs">
        <span className="sk sk-text" style={{width: 80}} />
      </div>
      <div className="section-head">
        <div>
          <span className="sk sk-text" style={{width: 140, height: 11}} />
          <span className="sk sk-display" />
        </div>
        <span className="sk sk-text" style={{width: 200}} />
      </div>
      <div className="skeleton-rows">
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className="skeleton-row">
            <span className="sk sk-text" style={{width: 32}} />
            <span className="sk sk-display" style={{height: 38}} />
            <span className="sk sk-text" style={{width: 120}} />
            <span className="sk sk-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}
