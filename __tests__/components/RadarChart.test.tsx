import React, {act} from 'react';
import {render, screen} from '@testing-library/react';
import RadarChart from '../../app/[locale]/components/RadarChart';

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

  it('renders all skill labels', () => {
    render(<RadarChart skills={mockSkills} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('C/C++')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('renders grid polygons for each level', () => {
    const {container} = render(<RadarChart skills={mockSkills} />);
    // 4 grid levels (25%, 50%, 75%, 100%) + 1 data polygon = 5 polygons
    const polygons = container.querySelectorAll('polygon');
    expect(polygons).toHaveLength(5);
  });

  it('renders axis lines for each skill', () => {
    const {container} = render(<RadarChart skills={mockSkills} />);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(mockSkills.length);
  });

  it('starts with data polygon at center before intersection', () => {
    const {container} = render(<RadarChart skills={mockSkills} />);
    const dataPolygon = container.querySelectorAll('polygon')[4]; // last polygon is data
    // All points should be at center (150,150)
    const points = dataPolygon.getAttribute('points')!;
    points.split(' ').forEach((point) => {
      const [x, y] = point.split(',').map(Number);
      expect(x).toBe(200);
      expect(y).toBe(200);
    });
  });

  it('animates data polygon to target points after intersection', () => {
    const {container} = render(<RadarChart skills={mockSkills} />);

    act(() => { triggerIntersection(); });

    const dataPolygon = container.querySelectorAll('polygon')[4];
    const points = dataPolygon.getAttribute('points')!;
    // After animation, points should NOT all be at center
    const coords = points.split(' ').map((p) => p.split(',').map(Number));
    const allAtCenter = coords.every(([x, y]) => x === 200 && y === 200);
    expect(allAtCenter).toBe(false);
  });

  it('renders data dots for each skill', () => {
    const {container} = render(<RadarChart skills={mockSkills} />);
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(mockSkills.length);
  });

  it('returns null for fewer than 3 skills', () => {
    const {container} = render(
      <RadarChart skills={[{name: 'A', level: 50}, {name: 'B', level: 60}]} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('disconnects observer on unmount', () => {
    const {unmount} = render(<RadarChart skills={mockSkills} />);
    unmount();
    expect(observerDisconnect).toHaveBeenCalled();
  });
});
