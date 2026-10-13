'use client';

export type RadarSkill = {name: string; level: number};

const RADIUS = 100;
const RINGS = [0.25, 0.5, 0.75, 1];
const LABEL_OFFSET = 14;

type Point = readonly [number, number];

const format = ([x, y]: Point) => `${x.toFixed(1)},${y.toFixed(1)}`;

// One radar for every skills view. Purely presentational: the parent owns
// which axis is active and is told when a label is hovered.
export default function RadarChart({
  skills,
  active,
  onActiveChange,
}: {
  skills: RadarSkill[];
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  if (skills.length < 3) return null;

  const count = skills.length;
  // Start at the top and go clockwise.
  const vertex = (i: number, radius: number): Point => {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  };
  const ring = (radius: number) => skills.map((_, i) => format(vertex(i, radius))).join(' ');
  const points = skills.map((skill, i) => vertex(i, (RADIUS * skill.level) / 100));

  return (
    <svg
      viewBox="-215 -125 430 250"
      className="mx-auto block w-full max-w-[460px] overflow-visible"
      data-testid="radar-chart"
      aria-hidden="true"
    >
      <g fill="none" stroke="var(--rule)" strokeWidth={1}>
        {RINGS.map((share) => (
          <polygon key={share} points={ring(RADIUS * share)} />
        ))}
        {skills.map((skill, i) => {
          const [x, y] = vertex(i, RADIUS);
          return <line key={skill.name} x1={0} y1={0} x2={x.toFixed(1)} y2={y.toFixed(1)} />;
        })}
      </g>

      <polygon
        points={points.map(format).join(' ')}
        fill="var(--accent)"
        fillOpacity={0.1}
        stroke="var(--accent)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        data-testid="radar-shape"
      />

      {points.map(([x, y], i) => (
        <circle
          key={skills[i].name}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          r={i === active ? 4 : 2.5}
          fill={i === active ? 'var(--accent)' : 'var(--bg)'}
          stroke="var(--accent)"
          strokeWidth={1.25}
        />
      ))}

      {skills.map((skill, i) => {
        const [x, y] = vertex(i, RADIUS + LABEL_OFFSET);
        const cos = Math.cos(Math.atan2(y, x));
        const anchor = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle';
        return (
          <text
            key={skill.name}
            x={x.toFixed(1)}
            y={y.toFixed(1)}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={10}
            className="cursor-default font-mono transition-[fill] duration-200"
            fill={i === active ? 'var(--ink)' : 'var(--ink-muted)'}
            onMouseEnter={onActiveChange ? () => onActiveChange(i) : undefined}
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
}
