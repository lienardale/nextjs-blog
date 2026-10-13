'use client';

import {useState} from 'react';
import RadarChart from './RadarChart';
import SkillBar, {type BarSkill} from './SkillBar';

export type Skill = BarSkill;

// The radar and its rows, linked: hovering a row or a radar label
// highlights the same skill in both.
export default function HardSkills({
  skills,
  variant = 'detailed',
  rowsLabel,
}: {
  skills: Skill[];
  variant?: 'detailed' | 'compact';
  /** Optional mono label between the radar and the rows. */
  rowsLabel?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className={rowsLabel ? 'pb-6' : 'pt-2 pb-6'}>
        <RadarChart skills={skills} active={active} onActiveChange={setActive} />
      </div>
      {rowsLabel ? <h2 className="section-label pb-3">{rowsLabel}</h2> : null}
      <SkillBar skills={skills} variant={variant} active={active} onActiveChange={setActive} />
    </div>
  );
}
