import React from 'react';
import {render, screen} from '@testing-library/react';
import Timeline from '../../app/[locale]/components/Timeline';

// Mock next-intl navigation
jest.mock('../../lib/i18n/navigation', () => ({
  Link: ({href, children, ...props}: {href: string; children: React.ReactNode; className?: string}) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock IntersectionObserver
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();
let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  observeMock.mockClear();
  unobserveMock.mockClear();
  disconnectMock.mockClear();
  (global as any).IntersectionObserver = jest.fn((callback) => {
    observerCallback = callback;
    return {
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    };
  });
});

const mockEntries = [
  {date: '2023-01-01', title: 'First Job', content: <p>Description of first job</p>},
  {date: '2024-06-15', title: 'Second Job', content: <p>Description of second job</p>},
  {date: '2025-03-10', title: 'Third Job', content: <p>Description of third job</p>},
];

describe('Timeline', () => {
  it('renders all entry dates', () => {
    render(<Timeline entries={mockEntries} />);
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-06-15')).toBeInTheDocument();
    expect(screen.getByText('2025-03-10')).toBeInTheDocument();
  });

  it('renders all entry titles', () => {
    render(<Timeline entries={mockEntries} />);
    expect(screen.getByText('First Job')).toBeInTheDocument();
    expect(screen.getByText('Second Job')).toBeInTheDocument();
    expect(screen.getByText('Third Job')).toBeInTheDocument();
  });

  it('renders all entry content', () => {
    render(<Timeline entries={mockEntries} />);
    expect(screen.getByText('Description of first job')).toBeInTheDocument();
    expect(screen.getByText('Description of second job')).toBeInTheDocument();
    expect(screen.getByText('Description of third job')).toBeInTheDocument();
  });

  it('all entries start with opacity-0 class', () => {
    render(<Timeline entries={mockEntries} />);
    const entries = screen.getAllByTestId('timeline-entry');
    entries.forEach((entry) => {
      expect(entry).toHaveClass('opacity-0');
      expect(entry).toHaveClass('translate-y-4');
    });
  });

  it('sets up IntersectionObserver on entries', () => {
    render(<Timeline entries={mockEntries} />);
    // Each entry observed (mobile + desktop share same ref)
    expect(observeMock).toHaveBeenCalledTimes(3);
  });

  it('makes entry visible when it intersects', () => {
    render(<Timeline entries={mockEntries} />);
    const entries = screen.getAllByTestId('timeline-entry');

    // Simulate first entry intersecting
    React.act(() => {
      observerCallback(
        [{isIntersecting: true, target: entries[0]} as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(entries[0]).toHaveClass('opacity-100');
    expect(entries[0]).toHaveClass('translate-y-0');
    expect(entries[1]).toHaveClass('opacity-0');
    expect(entries[2]).toHaveClass('opacity-0');
  });

  it('unobserves entry after it becomes visible', () => {
    render(<Timeline entries={mockEntries} />);
    const entries = screen.getAllByTestId('timeline-entry');

    React.act(() => {
      observerCallback(
        [{isIntersecting: true, target: entries[0]} as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(unobserveMock).toHaveBeenCalledWith(entries[0]);
  });

  it('ignores non-intersecting entries', () => {
    render(<Timeline entries={mockEntries} />);
    const entries = screen.getAllByTestId('timeline-entry');

    React.act(() => {
      observerCallback(
        [{isIntersecting: false, target: entries[0]} as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(entries[0]).toHaveClass('opacity-0');
  });

  it('disconnects observer on unmount', () => {
    const {unmount} = render(<Timeline entries={mockEntries} />);
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('renders nothing when entries is empty', () => {
    const {container} = render(<Timeline entries={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders timeline dots for each entry', () => {
    const {container} = render(<Timeline entries={mockEntries} />);
    const dots = container.querySelectorAll('.rounded-full.bg-blue-500');
    expect(dots).toHaveLength(3);
  });

  it('renders titles as h3 elements', () => {
    render(<Timeline entries={mockEntries} />);
    const headings = screen.getAllByRole('heading', {level: 3});
    expect(headings.length).toBeGreaterThanOrEqual(3);
  });

  it('renders links when entries have href', () => {
    const entriesWithLinks = [
      {date: '2023-01-01', title: 'Job', content: <p>Desc</p>, href: '/experience/job'},
    ];

    render(<Timeline entries={entriesWithLinks} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/experience/job');
  });

  it('does not render links when entries have no href', () => {
    const entriesNoLinks = [
      {date: '2023-01-01', title: 'Job', content: <p>Desc</p>},
    ];

    render(<Timeline entries={entriesNoLinks} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('renders the center line', () => {
    const {container} = render(<Timeline entries={mockEntries} />);
    expect(container.querySelector('.bg-gray-300')).toBeInTheDocument();
  });

  it('handles single entry', () => {
    const entries = [{date: '2023-01-01', title: 'Only Entry', content: <span>Content</span>}];
    render(<Timeline entries={entries} />);
    expect(screen.getAllByTestId('timeline-entry')).toHaveLength(1);
  });
});
