import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import SkillBar from '../../app/[locale]/components/SkillBar';

const mockSkills = [
  {name: 'TypeScript', level: 90, tag: 'FE · BE', note: 'primary stack'},
  {name: 'React', level: 85, tag: 'FE', note: 'production UIs'},
  {name: 'Docker', level: 65},
];

describe('SkillBar', () => {
  it('has data-testid="skill-bar"', () => {
    render(<SkillBar skills={mockSkills} />);
    expect(screen.getByTestId('skill-bar')).toBeInTheDocument();
  });

  it('renders one row per skill', () => {
    render(<SkillBar skills={mockSkills} />);
    expect(within(screen.getByTestId('skill-bar')).getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders all skill names', () => {
    render(<SkillBar skills={mockSkills} />);
    for (const skill of mockSkills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    }
  });

  it('renders all skill levels', () => {
    render(<SkillBar skills={mockSkills} />);
    for (const skill of mockSkills) {
      expect(screen.getByText(String(skill.level))).toBeInTheDocument();
    }
  });

  it('sizes each bar to its level', () => {
    render(<SkillBar skills={mockSkills} />);
    const fills = screen.getAllByTestId('skill-bar-fill');
    expect(fills.map((fill) => fill.style.width)).toEqual(['90%', '85%', '65%']);
  });

  it('compact variant shows only name, bar and level', () => {
    render(<SkillBar skills={mockSkills} />);
    expect(screen.queryByText('01')).not.toBeInTheDocument();
    expect(screen.queryByText('FE · BE')).not.toBeInTheDocument();
    expect(screen.queryByText('primary stack')).not.toBeInTheDocument();
  });

  it('detailed variant adds the index, tag and note', () => {
    render(<SkillBar skills={mockSkills} variant="detailed" />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('FE · BE')).toBeInTheDocument();
    expect(screen.getByText('primary stack')).toBeInTheDocument();
  });

  it('colours only the active bar with the accent', () => {
    render(<SkillBar skills={mockSkills} active={1} />);
    const fills = screen.getAllByTestId('skill-bar-fill');

    expect(fills[1]).toHaveClass('bg-accent');
    expect(fills[0]).toHaveClass('bg-ink-muted');
    expect(fills[2]).toHaveClass('bg-ink-muted');
  });

  it('reports the row being pointed at or tapped', () => {
    const onActiveChange = jest.fn();
    render(<SkillBar skills={mockSkills} active={0} onActiveChange={onActiveChange} />);
    const rows = screen.getAllByRole('listitem');

    fireEvent.pointerEnter(rows[2]);
    expect(onActiveChange).toHaveBeenLastCalledWith(2);

    fireEvent.click(rows[1]);
    expect(onActiveChange).toHaveBeenLastCalledWith(1);
  });

  it('renders empty when no skills provided', () => {
    render(<SkillBar skills={[]} />);
    expect(screen.getByTestId('skill-bar').children.length).toBe(0);
  });
});
