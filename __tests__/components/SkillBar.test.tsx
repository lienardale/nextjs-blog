import React from 'react';
import {render, screen, act} from '@testing-library/react';
import SkillBar from '../../app/[locale]/components/SkillBar';

describe('SkillBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockSkills = [
    {name: 'JavaScript', level: 90},
    {name: 'TypeScript', level: 85},
    {name: 'React', level: 80},
  ];

  it('renders all skill names', () => {
    render(<SkillBar skills={mockSkills} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders all skill percentages', () => {
    render(<SkillBar skills={mockSkills} />);

    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('initially renders bars with 0% width', () => {
    const {container} = render(<SkillBar skills={mockSkills} />);

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({width: '0%'});
    });
  });

  it('animates bars to target width after 100ms timeout', () => {
    const {container} = render(<SkillBar skills={mockSkills} />);

    // Before timer fires, bars should be at 0%
    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({width: '0%'});
    });

    // Advance timer past the 100ms threshold
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // After timer, bars should animate to their target widths
    const updatedBars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    expect(updatedBars[0]).toHaveStyle({width: '90%'});
    expect(updatedBars[1]).toHaveStyle({width: '85%'});
    expect(updatedBars[2]).toHaveStyle({width: '80%'});
  });

  it('cycles through the 8-color array', () => {
    const manySkills = [
      {name: 'Skill 1', level: 10},
      {name: 'Skill 2', level: 20},
      {name: 'Skill 3', level: 30},
      {name: 'Skill 4', level: 40},
      {name: 'Skill 5', level: 50},
      {name: 'Skill 6', level: 60},
      {name: 'Skill 7', level: 70},
      {name: 'Skill 8', level: 80},
      {name: 'Skill 9', level: 90},  // Should wrap back to first color
      {name: 'Skill 10', level: 95}, // Should use second color
    ];

    const expectedColors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-cyan-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-blue-500',   // index 8 % 8 = 0
      'bg-green-500',  // index 9 % 8 = 1
    ];

    const {container} = render(<SkillBar skills={manySkills} />);

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    bars.forEach((bar, i) => {
      expect(bar).toHaveClass(expectedColors[i]);
    });
  });

  it('uses custom color when provided on a skill', () => {
    const skillsWithColor = [
      {name: 'Custom', level: 75, color: 'bg-indigo-500'},
      {name: 'Default', level: 60},
    ];

    const {container} = render(<SkillBar skills={skillsWithColor} />);

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    expect(bars[0]).toHaveClass('bg-indigo-500');
    // Second bar should use default colors[1] = bg-green-500
    expect(bars[1]).toHaveClass('bg-green-500');
  });

  it('renders empty when no skills provided', () => {
    const {container} = render(<SkillBar skills={[]} />);

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    expect(bars).toHaveLength(0);
  });

  it('clears timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const {unmount} = render(<SkillBar skills={mockSkills} />);
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('bars do not animate before the 100ms timeout', () => {
    const {container} = render(<SkillBar skills={mockSkills} />);

    act(() => {
      jest.advanceTimersByTime(50);
    });

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({width: '0%'});
    });
  });

  it('renders the correct structure with labels and bars', () => {
    const {container} = render(<SkillBar skills={[{name: 'Python', level: 70}]} />);

    // Should have the outer space-y-3 container
    expect(container.querySelector('.space-y-3')).toBeInTheDocument();

    // Should have the label area
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();

    // Should have the bar background
    expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
  });
});
