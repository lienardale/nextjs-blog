'use client';

import {useEffect, useRef, useState} from 'react';

type Skill = {name: string; level: number; color?: string};

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-cyan-500',
  'bg-pink-500',
  'bg-yellow-500',
];

export default function SkillBar({skills}: {skills: Skill[]}) {
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} data-testid="skill-bar" className="space-y-3">
      {skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{skill.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${skill.color ?? colors[i % colors.length]}`}
              style={{width: animated ? `${skill.level}%` : '0%'}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
