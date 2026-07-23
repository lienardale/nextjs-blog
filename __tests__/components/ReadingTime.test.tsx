import React from 'react';
import {render, screen} from '@testing-library/react';
import ReadingTime from '../../app/[locale]/components/ReadingTime';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string, params?: Record<string, unknown>) => {
    if (key === 'reading_time') return `${params?.minutes} min read`;
    return key;
  }),
}));

// Mock @heroicons/react
jest.mock('@heroicons/react/24/outline', () => ({
  ClockIcon: (props: any) => <svg data-testid="clock-icon" {...props} />,
}));

describe('ReadingTime', () => {
  it('renders reading time text', () => {
    render(<ReadingTime minutes={3} />);
    expect(screen.getByText('3 min read')).toBeInTheDocument();
  });

  it('renders clock icon', () => {
    render(<ReadingTime minutes={5} />);
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('renders for 1 minute', () => {
    render(<ReadingTime minutes={1} />);
    expect(screen.getByText('1 min read')).toBeInTheDocument();
  });

  it('renders for large reading times', () => {
    render(<ReadingTime minutes={15} />);
    expect(screen.getByText('15 min read')).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<ReadingTime minutes={3} />);
    const span = screen.getByText('3 min read').closest('span');
    expect(span).toHaveClass('text-sm', 'text-ink-muted');
  });
});
