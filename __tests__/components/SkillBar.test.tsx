import React, {act} from 'react';
import {render, screen} from '@testing-library/react';
import SkillBar from '../../app/[locale]/components/SkillBar';

let observerCallback: IntersectionObserverCallback;
let observerDisconnect: jest.Mock;

beforeEach(() => {
  observerDisconnect = jest.fn();
  (global as any).IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: observerDisconnect,
    };
  });
});

function triggerIntersection() {
  observerCallback(
    [{isIntersecting: true} as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe('SkillBar', () => {
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

  it('animates bars to target width after intersection', () => {
    const {container} = render(<SkillBar skills={mockSkills} />);

    // Before intersection, bars should be at 0%
    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({width: '0%'});
    });

    // Trigger intersection
    act(() => { triggerIntersection(); });

    // After intersection, bars should animate to their target widths
    const updatedBars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    expect(updatedBars[0]).toHaveStyle({width: '90%'});
    expect(updatedBars[1]).toHaveStyle({width: '85%'});
    expect(updatedBars[2]).toHaveStyle({width: '80%'});
  });

  it('disconnects observer after intersection', () => {
    render(<SkillBar skills={mockSkills} />);

    act(() => { triggerIntersection(); });

    expect(observerDisconnect).toHaveBeenCalled();
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
      {name: 'Skill 9', level: 90},
      {name: 'Skill 10', level: 95},
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
      'bg-blue-500',
      'bg-green-500',
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
    expect(bars[1]).toHaveClass('bg-green-500');
  });

  it('renders empty when no skills provided', () => {
    const {container} = render(<SkillBar skills={[]} />);

    const bars = container.querySelectorAll('.h-2\\.5.rounded-full.transition-all');
    expect(bars).toHaveLength(0);
  });

  it('disconnects observer on unmount', () => {
    const {unmount} = render(<SkillBar skills={mockSkills} />);
    unmount();

    expect(observerDisconnect).toHaveBeenCalled();
  });

  it('has data-testid="skill-bar"', () => {
    render(<SkillBar skills={mockSkills} />);
    expect(screen.getByTestId('skill-bar')).toBeInTheDocument();
  });

  it('renders the correct structure with labels and bars', () => {
    const {container} = render(<SkillBar skills={[{name: 'Python', level: 70}]} />);

    expect(container.querySelector('.space-y-3')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(container.querySelector('.bg-bg-alt')).toBeInTheDocument();
  });
});
