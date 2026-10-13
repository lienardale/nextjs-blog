'use client';

export type BarSkill = {name: string; level: number; tag?: string; note?: string};

// Skill rows with a 2px level bar. `detailed` adds the index, tag and note
// columns (Skills overview); `compact` is name / bar / level (Stack).
export default function SkillBar({
  skills,
  variant = 'compact',
  active,
  onActiveChange,
}: {
  skills: BarSkill[];
  variant?: 'detailed' | 'compact';
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  const detailed = variant === 'detailed';

  return (
    <ol data-testid="skill-bar">
      {skills.map((skill, i) => {
        const isActive = i === active;
        const activate = onActiveChange ? () => onActiveChange(i) : undefined;
        return (
          <li
            key={skill.name}
            className={`row cursor-default items-center gap-[14px] py-[11px] text-[14px] ${
              detailed
                ? 'grid-cols-[24px_minmax(0,1.3fr)_minmax(0,1fr)_28px]'
                : 'grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_28px]'
            }`}
            data-active={isActive ? 'true' : undefined}
            onPointerEnter={activate}
            onClick={activate}
          >
            {detailed ? (
              <span className={`font-mono text-[11px] ${isActive ? 'text-accent' : 'text-ink-muted'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
            ) : null}
            {detailed ? (
              <span className="flex flex-col leading-[1.35]">
                <span className="font-medium">
                  {skill.name}{' '}
                  {skill.tag ? (
                    <span className="font-mono text-[10px] font-normal text-ink-muted">{skill.tag}</span>
                  ) : null}
                </span>
                {skill.note ? <span className="text-[12px] text-ink-muted">{skill.note}</span> : null}
              </span>
            ) : (
              <span className="font-medium">{skill.name}</span>
            )}
            <span className="relative h-0.5 overflow-hidden rounded-[2px] bg-rule">
              <span
                className={`absolute inset-y-0 left-0 transition-colors duration-200 ${
                  isActive ? 'bg-accent' : 'bg-ink-muted'
                }`}
                style={{width: `${skill.level}%`}}
                data-testid="skill-bar-fill"
              />
            </span>
            <span className="text-right font-mono text-[12px]">{skill.level}</span>
          </li>
        );
      })}
    </ol>
  );
}
