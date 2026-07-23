'use client';

import {useEffect, useRef, useState} from 'react';

type Skill = {name: string; level: number};

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 120;
const LABEL_OFFSET = 32;
const GRID_LEVELS = [25, 50, 75, 100];

function polarToCartesian(angle: number, radius: number): [number, number] {
  // Start from top (-90°) and go clockwise
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(rad), CENTER + radius * Math.sin(rad)];
}

function polygonPoints(count: number, radius: number): string {
  const step = 360 / count;
  return Array.from({length: count}, (_, i) => polarToCartesian(i * step, radius))
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
}

function dataPoints(skills: Skill[], animated: boolean): string {
  const count = skills.length;
  const step = 360 / count;
  return skills
    .map((skill, i) => {
      const r = animated ? (skill.level / 100) * RADIUS : 0;
      return polarToCartesian(i * step, r);
    })
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
}

export default function RadarChart({skills}: {skills: Skill[]}) {
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      {threshold: 0.2}
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (skills.length < 3) return null;

  const count = skills.length;
  const step = 360 / count;

  return (
    <svg
      ref={containerRef}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-sm mx-auto"
      data-testid="radar-chart"
    >
      {/* Grid polygons */}
      {GRID_LEVELS.map((level) => (
        <polygon
          key={level}
          points={polygonPoints(count, (level / 100) * RADIUS)}
          fill="none"
          stroke="currentColor"
          className="text-ink-muted"
          strokeWidth={0.5}
        />
      ))}

      {/* Axis lines */}
      {skills.map((_, i) => {
        const [x, y] = polarToCartesian(i * step, RADIUS);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="currentColor"
            className="text-ink-muted"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints(skills, animated)}
        className="fill-blue-500/25 stroke-blue-500 dark:fill-blue-400/25 dark:stroke-blue-400"
        strokeWidth={2}
        style={{transition: 'all 0.8s ease-out'}}
      />

      {/* Data dots */}
      {skills.map((skill, i) => {
        const r = animated ? (skill.level / 100) * RADIUS : 0;
        const [x, y] = polarToCartesian(i * step, r);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            className="fill-blue-500 dark:fill-blue-400"
            style={{transition: 'all 0.8s ease-out'}}
          />
        );
      })}

      {/* Labels */}
      {skills.map((skill, i) => {
        const [x, y] = polarToCartesian(i * step, RADIUS + LABEL_OFFSET);
        return (
          <text
            key={skill.name}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-ink-soft text-[10px]"
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
}
