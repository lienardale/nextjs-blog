import React from 'react';
import {render, screen, act} from '@testing-library/react';
import Timeline from '../../app/[locale]/components/Timeline';

describe('Timeline', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockEntries = [
    {date: '2023-01-01', title: 'First Job', content: <p>Description of first job</p>},
    {date: '2024-06-15', title: 'Second Job', content: <p>Description of second job</p>},
    {date: '2025-03-10', title: 'Third Job', content: <p>Description of third job</p>},
  ];

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
    const {container} = render(<Timeline entries={mockEntries} />);

    const entries = container.querySelectorAll('.mb-8.relative');
    entries.forEach((entry) => {
      expect(entry).toHaveClass('opacity-0');
      expect(entry).toHaveClass('-translate-x-4');
    });
  });

  it('first entry becomes visible after 150ms', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    const entries = container.querySelectorAll('.mb-8.relative');
    expect(entries[0]).toHaveClass('opacity-100');
    expect(entries[0]).toHaveClass('translate-x-0');
    expect(entries[1]).toHaveClass('opacity-0');
    expect(entries[2]).toHaveClass('opacity-0');
  });

  it('second entry becomes visible after 300ms', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const entries = container.querySelectorAll('.mb-8.relative');
    expect(entries[0]).toHaveClass('opacity-100');
    expect(entries[1]).toHaveClass('opacity-100');
    expect(entries[1]).toHaveClass('translate-x-0');
    expect(entries[2]).toHaveClass('opacity-0');
  });

  it('third entry becomes visible after 450ms', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    act(() => {
      jest.advanceTimersByTime(450);
    });

    const entries = container.querySelectorAll('.mb-8.relative');
    expect(entries[0]).toHaveClass('opacity-100');
    expect(entries[1]).toHaveClass('opacity-100');
    expect(entries[2]).toHaveClass('opacity-100');
    expect(entries[2]).toHaveClass('translate-x-0');
  });

  it('staggered visibility follows the 150ms * (index + 1) pattern', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    // At 100ms: nothing visible yet (first fires at 150ms)
    act(() => {
      jest.advanceTimersByTime(100);
    });
    const entries = container.querySelectorAll('.mb-8.relative');
    expect(entries[0]).toHaveClass('opacity-0');
    expect(entries[1]).toHaveClass('opacity-0');
    expect(entries[2]).toHaveClass('opacity-0');

    // At 150ms: first entry visible
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(entries[0]).toHaveClass('opacity-100');
    expect(entries[1]).toHaveClass('opacity-0');

    // At 200ms: still only first visible (second fires at 300ms)
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(entries[1]).toHaveClass('opacity-0');

    // At 300ms: second visible
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(entries[1]).toHaveClass('opacity-100');
    expect(entries[2]).toHaveClass('opacity-0');

    // At 450ms: third visible
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(entries[2]).toHaveClass('opacity-100');
  });

  it('clears all timeouts on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const {unmount} = render(<Timeline entries={mockEntries} />);
    unmount();

    // Should clear one timeout per entry
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(3);
    clearTimeoutSpy.mockRestore();
  });

  it('renders empty timeline when no entries provided', () => {
    const {container} = render(<Timeline entries={[]} />);

    const entries = container.querySelectorAll('.mb-8.relative');
    expect(entries).toHaveLength(0);
  });

  it('renders the timeline container with border-l-2 class', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    expect(container.querySelector('.border-l-2')).toBeInTheDocument();
  });

  it('renders timeline dots for each entry', () => {
    const {container} = render(<Timeline entries={mockEntries} />);

    const dots = container.querySelectorAll('.rounded-full.bg-blue-500');
    expect(dots).toHaveLength(3);
  });

  it('renders titles as h3 elements', () => {
    render(<Timeline entries={mockEntries} />);

    const headings = screen.getAllByRole('heading', {level: 3});
    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent('First Job');
    expect(headings[1]).toHaveTextContent('Second Job');
    expect(headings[2]).toHaveTextContent('Third Job');
  });

  it('handles string content', () => {
    const entries = [
      {date: '2023-01-01', title: 'Entry', content: 'Simple text content'},
    ];

    render(<Timeline entries={entries} />);
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
  });

  it('handles single entry', () => {
    const entries = [
      {date: '2023-01-01', title: 'Only Entry', content: <span>Content</span>},
    ];

    const {container} = render(<Timeline entries={entries} />);

    const items = container.querySelectorAll('.mb-8.relative');
    expect(items).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(items[0]).toHaveClass('opacity-100');
  });
});
