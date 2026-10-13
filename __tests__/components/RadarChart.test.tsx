import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import RadarChart from '../../app/[locale]/components/RadarChart';

const mockSkills = [
  {name: 'TypeScript', level: 90},
  {name: 'React', level: 85},
  {name: 'Node.js', level: 80},
  {name: 'C/C++', level: 75},
  {name: 'Docker', level: 65},
];

describe('RadarChart', () => {
  it('renders SVG element', () => {
    render(<RadarChart skills={mockSkills} />);
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('radar-chart').tagName).toBe('svg');
  });

  it('uses the shared viewBox', () => {
    render(<RadarChart skills={mockSkills} />);
    expect(screen.getByTestId('radar-chart')).toHaveAttribute('viewBox', '-215 -125 430 250');
  });

  it('renders all skill labels', () => {
    render(<RadarChart skills={mockSkills} />);
    for (const skill of mockSkills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    }
  });

  it('renders grid polygons for each level', () => {
    render(<RadarChart skills={mockSkills} />);
    const svg = screen.getByTestId('radar-chart');
    // 4 grid rings + 1 data shape = 5 polygons
    expect(svg.querySelectorAll('polygon').length).toBe(5);
  });

  it('renders axis lines for each skill', () => {
    render(<RadarChart skills={mockSkills} />);
    const svg = screen.getByTestId('radar-chart');
    expect(svg.querySelectorAll('line').length).toBe(mockSkills.length);
  });

  it('plots the data shape at each skill level, starting from the top', () => {
    render(<RadarChart skills={mockSkills} />);
    const points = screen.getByTestId('radar-shape').getAttribute('points')!;
    const coords = points.split(' ').map((p) => p.split(',').map(Number));

    expect(coords.length).toBe(mockSkills.length);
    // First axis points straight up: x = 0, y = -(level% of the 100 radius)
    expect(coords[0][0]).toBeCloseTo(0);
    expect(coords[0][1]).toBeCloseTo(-90);
  });

  it('renders data dots for each skill', () => {
    render(<RadarChart skills={mockSkills} />);
    const svg = screen.getByTestId('radar-chart');
    expect(svg.querySelectorAll('circle').length).toBe(mockSkills.length);
  });

  it('enlarges and fills only the active dot', () => {
    render(<RadarChart skills={mockSkills} active={2} />);
    const dots = screen.getByTestId('radar-chart').querySelectorAll('circle');

    expect(dots[2]).toHaveAttribute('r', '4');
    expect(dots[2]).toHaveAttribute('fill', 'var(--accent)');
    expect(dots[0]).toHaveAttribute('r', '2.5');
    expect(dots[0]).toHaveAttribute('fill', 'var(--bg)');
  });

  it('highlights the active label', () => {
    render(<RadarChart skills={mockSkills} active={1} />);
    expect(screen.getByText('React')).toHaveAttribute('fill', 'var(--ink)');
    expect(screen.getByText('Docker')).toHaveAttribute('fill', 'var(--ink-muted)');
  });

  it('reports the hovered label', () => {
    const onActiveChange = jest.fn();
    render(<RadarChart skills={mockSkills} active={0} onActiveChange={onActiveChange} />);

    fireEvent.mouseEnter(screen.getByText('C/C++'));

    expect(onActiveChange).toHaveBeenCalledWith(3);
  });

  it('draws with palette tokens only', () => {
    render(<RadarChart skills={mockSkills} />);
    const svg = screen.getByTestId('radar-chart');
    expect(svg.querySelector('radialGradient')).toBeNull();
    expect(svg.innerHTML).not.toMatch(/#[0-9a-f]{3,8}\b|blue-/i);
  });

  it('returns null for fewer than 3 skills', () => {
    const {container} = render(
      <RadarChart skills={[{name: 'A', level: 50}, {name: 'B', level: 60}]} />
    );
    expect(container.querySelector('svg')).toBeNull();
  });
});
