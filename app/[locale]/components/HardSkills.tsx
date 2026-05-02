'use client';

import {useEffect, useRef, useState} from 'react';

export type Skill = {
  name: string;
  tag: string;
  level: number; // 0..100
  note: string;
  soft?: boolean;
};

export default function HardSkills({skills}: {skills: Skill[]}) {
  const [active, setActive] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const shapeRef = useRef<SVGPolygonElement>(null);

  const N = skills.length;
  const R = 200;

  const vert = (i: number, rad: number) => {
    const ang = -Math.PI / 2 + (i / N) * Math.PI * 2;
    return [Math.cos(ang) * rad, Math.sin(ang) * rad] as const;
  };

  const ringPercents = [0.25, 0.5, 0.75, 1];
  const rings = ringPercents.map((p) => {
    const pts = [] as string[];
    for (let i = 0; i < N; i++) {
      const [x, y] = vert(i, R * p);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  });

  const axes = skills.map((_, i) => {
    const [ex, ey] = vert(i, R);
    return {x: ex.toFixed(1), y: ey.toFixed(1)};
  });

  const labels = skills.map((s, i) => {
    const [lx, ly] = vert(i, R + 28);
    const ang = Math.atan2(ly, lx);
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (Math.cos(ang) > 0.25) anchor = 'start';
    else if (Math.cos(ang) < -0.25) anchor = 'end';
    const [nx, ny] = vert(i, R + 44);
    return {x: lx.toFixed(1), y: ly.toFixed(1), anchor, name: s.name, nx: nx.toFixed(1), ny: ny.toFixed(1)};
  });

  const dots = skills.map((s, i) => {
    const [x, y] = vert(i, R * (s.level / 100));
    return {x: x.toFixed(1), y: y.toFixed(1)};
  });

  const shapePts = dots.map((d) => `${d.x},${d.y}`).join(' ');

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;
    const zero = skills.map(() => '0,0').join(' ');
    shape.setAttribute('points', zero);
    requestAnimationFrame(() => {
      shape.style.transition = 'none';
      requestAnimationFrame(() => {
        shape.style.transition = 'all 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        shape.setAttribute('points', shapePts);
      });
    });
  }, [shapePts, skills]);

  return (
    <div className="hard-body">
      <figure className="radar" aria-hidden="true">
        <figcaption className="radar-cap">
          <span className="eyebrow">Fig. 03b — fluency radar</span>
          <span className="mono">n={N} · self-reported</span>
        </figcaption>
        <div className="radar-stage">
          <svg ref={svgRef} className="radar-svg" viewBox="-260 -260 520 520" role="img">
            <defs>
              <radialGradient id="radarFill" cx="0" cy="0" r="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.10" />
              </radialGradient>
            </defs>
            <g
              className="radar-rings"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              style={{color: 'color-mix(in oklab, var(--ink) 18%, transparent)'}}
            >
              {rings.map((pts, i) => (
                <polygon key={i} className={`ring r${i + 1}`} points={pts} />
              ))}
            </g>
            <g
              className="radar-axes"
              stroke="currentColor"
              strokeWidth="1"
              style={{color: 'color-mix(in oklab, var(--ink) 18%, transparent)'}}
            >
              {axes.map((a, i) => (
                <line key={i} x1="0" y1="0" x2={a.x} y2={a.y} />
              ))}
            </g>
            <g
              className="radar-ringlabels"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="currentColor"
              style={{color: 'var(--ink-muted)', letterSpacing: '0.12em'}}
            >
              {[25, 50, 75, 100].map((v) => (
                <text key={v} x="4" y={String(-R * (v / 100) - 4)} fontSize="9" letterSpacing="0.16em">
                  {v}
                </text>
              ))}
            </g>
            <polygon
              ref={shapeRef}
              className="radar-shape"
              points={shapePts}
              fill="url(#radarFill)"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <g className="radar-dots">
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="4" className={i === active ? 'is-active' : ''} />
              ))}
            </g>
            <g
              className="radar-labels"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="currentColor"
              style={{color: 'var(--ink)', letterSpacing: '0.1em'}}
            >
              {labels.map((l, i) => (
                <g key={i}>
                  <text
                    x={l.x}
                    y={l.y}
                    textAnchor={l.anchor}
                    dominantBaseline="middle"
                    className={i === active ? 'is-active' : ''}
                  >
                    {l.name}
                  </text>
                  <text x={l.nx} y={l.ny} textAnchor={l.anchor} dominantBaseline="middle" className="ax-num">
                    {String(i + 1).padStart(2, '0')}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
        <div className="radar-legend">
          <span className="lg-item"><span className="lg-sw lg-sw-fluency" />fluency</span>
          <span className="lg-item"><span className="lg-sw lg-sw-axis" />0 → 100</span>
          <span className="lg-item lg-tip">hover a row →</span>
        </div>
      </figure>

      <ol className="hard-list">
        {skills.map((s, i) => (
          <li
            key={i}
            className={`h-row ${i === active ? 'is-active' : ''} ${s.soft ? 'h-row-soft' : ''}`}
            style={{['--lvl' as string]: s.level} as React.CSSProperties}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <button className="h-trigger" type="button" onClick={() => setActive(i)}>
              <span className="h-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="h-body">
                <span className="h-name" dangerouslySetInnerHTML={{__html: s.name + '<em>.</em>'}} />
                <span className="h-tag mono">{s.tag}</span>
              </span>
              <span className="h-rail"><span className="h-fill" /></span>
              <span className="h-score"><b>{s.level}</b><span className="mono">{s.note}</span></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
