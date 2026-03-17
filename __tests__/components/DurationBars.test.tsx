import React, {act} from 'react';
import {render, screen} from '@testing-library/react';
import DurationBars from '../../app/[locale]/components/DurationBars';

// Mock IntersectionObserver
let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  (global as any).IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  });
});

const mockItems = [
  {title: 'Job A', startDate: '2020-01', endDate: '2022-05'},
  {title: 'Job B', startDate: '2018-06', endDate: '2019-12'},
  {title: 'Job C', startDate: '2017-01', endDate: '2017-06'},
];

function triggerIntersection() {
  observerCallback(
    [{isIntersecting: true} as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe('DurationBars', () => {
  it('renders all item titles', () => {
    render(<DurationBars items={mockItems} />);
    expect(screen.getByText('Job A')).toBeInTheDocument();
    expect(screen.getByText('Job B')).toBeInTheDocument();
    expect(screen.getByText('Job C')).toBeInTheDocument();
  });

  it('renders date ranges', () => {
    render(<DurationBars items={mockItems} />);
    expect(screen.getByText(/2020-01 — 2022-05/)).toBeInTheDocument();
    expect(screen.getByText(/2018-06 — 2019-12/)).toBeInTheDocument();
  });

  it('renders duration text', () => {
    render(<DurationBars items={mockItems} />);
    // Job A: 2020-01 to 2022-05 = 28 months = 2 yrs 4 mo
    expect(screen.getByText(/2 yrs 4 mo/)).toBeInTheDocument();
    // Job B: 2018-06 to 2019-12 = 18 months = 1 yr 6 mo
    expect(screen.getByText(/1 yr 6 mo/)).toBeInTheDocument();
    // Job C: 2017-01 to 2017-06 = 5 months
    expect(screen.getByText(/5 mo/)).toBeInTheDocument();
  });

  it('returns null for empty items', () => {
    const {container} = render(<DurationBars items={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('has data-testid="duration-bars"', () => {
    render(<DurationBars items={mockItems} />);
    expect(screen.getByTestId('duration-bars')).toBeInTheDocument();
  });

  it('starts with bars at 0% width', () => {
    const {container} = render(<DurationBars items={mockItems} />);
    const bars = container.querySelectorAll('[style*="width"]');
    bars.forEach((bar) => {
      expect((bar as HTMLElement).style.width).toBe('0%');
    });
  });

  it('animates bars after intersection', () => {
    const {container} = render(<DurationBars items={mockItems} />);
    act(() => { triggerIntersection(); });

    const bars = container.querySelectorAll('[style*="width"]');
    // Job A is the longest (28 months) so it should be 100%
    expect((bars[0] as HTMLElement).style.width).toBe('100%');
    // Job B: 18/28 = ~64.28%
    const jobBWidth = parseFloat((bars[1] as HTMLElement).style.width);
    expect(jobBWidth).toBeCloseTo(64.28, 0);
    // Job C: 5/28 = ~17.86%
    const jobCWidth = parseFloat((bars[2] as HTMLElement).style.width);
    expect(jobCWidth).toBeCloseTo(17.86, 0);
  });

  it('uses blue color by default', () => {
    const {container} = render(<DurationBars items={mockItems} />);
    const bar = container.querySelector('.bg-blue-500');
    expect(bar).toBeInTheDocument();
  });

  it('uses green color when specified', () => {
    const {container} = render(<DurationBars items={mockItems} color="green" />);
    const bar = container.querySelector('.bg-green-500');
    expect(bar).toBeInTheDocument();
  });

  it('handles single item with 100% width', () => {
    const singleItem = [{title: 'Only Job', startDate: '2020-01', endDate: '2021-01'}];
    const {container} = render(<DurationBars items={singleItem} />);
    act(() => { triggerIntersection(); });

    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe('100%');
  });
});
