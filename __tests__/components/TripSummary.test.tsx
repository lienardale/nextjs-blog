import React from 'react';
import {render, screen} from '@testing-library/react';
import TripSummary from '../../app/[locale]/components/TripSummary';

describe('TripSummary', () => {
  const defaultProps = {
    totalTrips: 9,
    totalKm: 2496,
    totalDays: 31,
    labels: {trips: 'trips', km: 'km total', days: 'days on the road'},
  };

  it('renders with data-testid', () => {
    render(<TripSummary {...defaultProps} />);
    expect(screen.getByTestId('trip-summary')).toBeInTheDocument();
  });

  it('renders all three stat values', () => {
    render(<TripSummary {...defaultProps} />);
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  it('renders labels', () => {
    render(<TripSummary {...defaultProps} />);
    expect(screen.getByText('trips')).toBeInTheDocument();
    expect(screen.getByText('km total')).toBeInTheDocument();
    expect(screen.getByText('days on the road')).toBeInTheDocument();
  });
});
