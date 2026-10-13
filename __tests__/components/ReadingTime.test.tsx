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

describe('ReadingTime', () => {
  it('renders reading time text', () => {
    render(<ReadingTime minutes={3} />);
    expect(screen.getByText('3 min read')).toBeInTheDocument();
  });

  it('renders for 1 minute', () => {
    render(<ReadingTime minutes={1} />);
    expect(screen.getByText('1 min read')).toBeInTheDocument();
  });

  it('renders for large reading times', () => {
    render(<ReadingTime minutes={15} />);
    expect(screen.getByText('15 min read')).toBeInTheDocument();
  });

  it('is plain inline text that takes its style from where it sits', () => {
    const {container} = render(<ReadingTime minutes={3} />);
    const span = screen.getByText('3 min read');
    expect(span.tagName).toBe('SPAN');
    expect(span).not.toHaveAttribute('class');
    expect(container.querySelector('svg')).toBeNull();
  });
});
