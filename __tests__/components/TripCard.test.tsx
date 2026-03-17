import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import TripCard from '../../app/[locale]/components/TripCard';

describe('TripCard', () => {
  const defaultProps = {
    route: 'Nantes → Bordeaux',
    year: 2021,
    days: 6,
    km: 600,
    dayLabel: 'days',
  };

  it('renders with data-testid', () => {
    render(<TripCard {...defaultProps} />);
    expect(screen.getByTestId('trip-card')).toBeInTheDocument();
  });

  it('displays route name, year, days and km', () => {
    render(<TripCard {...defaultProps} />);
    expect(screen.getByText('Nantes → Bordeaux')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('6 days')).toBeInTheDocument();
    expect(screen.getByText('600 km')).toBeInTheDocument();
  });

  it('shows Komoot label when tourId is provided', () => {
    render(<TripCard {...defaultProps} komootTourId="449141002" />);
    expect(screen.getByText('Komoot')).toBeInTheDocument();
  });

  it('shows Map label when waypoints are provided', () => {
    const waypoints: [number, number][] = [[48.0, 1.0], [47.0, 0.5]];
    render(<TripCard {...defaultProps} waypoints={waypoints} />);
    expect(screen.getByText('Map')).toBeInTheDocument();
  });

  it('does not show expand indicator when no map data', () => {
    render(<TripCard {...defaultProps} />);
    expect(screen.queryByText('Komoot')).not.toBeInTheDocument();
    expect(screen.queryByText('Map')).not.toBeInTheDocument();
  });

  it('expands on click when Komoot tourId is provided', () => {
    render(<TripCard {...defaultProps} komootTourId="449141002" />);
    expect(screen.queryByText('Loading map...')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    // After expand, the label should disappear (empty string when expanded)
    expect(screen.queryByText('Komoot')).not.toBeInTheDocument();
  });
});
