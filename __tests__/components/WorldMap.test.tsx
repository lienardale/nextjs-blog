import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import WorldMap from '../../app/[locale]/components/WorldMap';

const mockLanguages = [
  {name: 'French', level: 'native', color: '#3b82f6', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
  {name: 'English', level: 'fluent', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
];

describe('WorldMap', () => {
  it('renders SVG element with data-testid', () => {
    render(<WorldMap languages={mockLanguages} />);
    expect(screen.getByTestId('world-map')).toBeInTheDocument();
  });

  it('renders all interactive country paths', () => {
    render(<WorldMap languages={mockLanguages} />);
    // French-speaking
    expect(screen.getByTestId('country-france')).toBeInTheDocument();
    expect(screen.getByTestId('country-belgium')).toBeInTheDocument();
    expect(screen.getByTestId('country-congo')).toBeInTheDocument();
    expect(screen.getByTestId('country-cameroon')).toBeInTheDocument();
    // English-speaking
    expect(screen.getByTestId('country-uk')).toBeInTheDocument();
    expect(screen.getByTestId('country-usa')).toBeInTheDocument();
    expect(screen.getByTestId('country-australia')).toBeInTheDocument();
    expect(screen.getByTestId('country-india')).toBeInTheDocument();
    expect(screen.getByTestId('country-south_africa')).toBeInTheDocument();
    // Dual-language
    expect(screen.getByTestId('country-canada')).toBeInTheDocument();
  });

  it('shows tooltip on hover with language name and level', () => {
    render(<WorldMap languages={mockLanguages} />);
    expect(screen.queryByTestId('map-tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('country-france'));
    const tooltip = screen.getByTestId('map-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('French');
    expect(tooltip).toHaveTextContent('native');
  });

  it('shows correct language for English-speaking countries', () => {
    render(<WorldMap languages={mockLanguages} />);

    fireEvent.mouseEnter(screen.getByTestId('country-usa'));
    const tooltip = screen.getByTestId('map-tooltip');
    expect(tooltip).toHaveTextContent('English');
    expect(tooltip).toHaveTextContent('fluent');
  });

  it('shows both languages for dual-language countries (Canada)', () => {
    render(<WorldMap languages={mockLanguages} />);

    fireEvent.mouseEnter(screen.getByTestId('country-canada'));
    const tooltip = screen.getByTestId('map-tooltip');
    expect(tooltip).toHaveTextContent('French');
    expect(tooltip).toHaveTextContent('native');
    expect(tooltip).toHaveTextContent('English');
    expect(tooltip).toHaveTextContent('fluent');
  });

  it('hides tooltip on mouse leave', () => {
    render(<WorldMap languages={mockLanguages} />);

    fireEvent.mouseEnter(screen.getByTestId('country-france'));
    expect(screen.getByTestId('map-tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('country-france'));
    expect(screen.queryByTestId('map-tooltip')).not.toBeInTheDocument();
  });

  it('renders legend with language names and levels', () => {
    render(<WorldMap languages={mockLanguages} />);
    expect(screen.getByText(/French — native/)).toBeInTheDocument();
    expect(screen.getByText(/English — fluent/)).toBeInTheDocument();
  });

  it('applies correct fill color to single-language countries', () => {
    render(<WorldMap languages={mockLanguages} />);
    const france = screen.getByTestId('country-france');
    expect(france).toHaveAttribute('fill', '#3b82f6');

    const usa = screen.getByTestId('country-usa');
    expect(usa).toHaveAttribute('fill', '#22c55e');
  });

  it('applies stripe pattern fill to dual-language countries', () => {
    render(<WorldMap languages={mockLanguages} />);
    const canada = screen.getByTestId('country-canada');
    expect(canada).toHaveAttribute('fill', 'url(#pattern-dual)');
  });

  it('shows tooltip for new countries (India, South Africa, Belgium)', () => {
    render(<WorldMap languages={mockLanguages} />);

    fireEvent.mouseEnter(screen.getByTestId('country-india'));
    expect(screen.getByTestId('map-tooltip')).toHaveTextContent('English');

    fireEvent.mouseLeave(screen.getByTestId('country-india'));

    fireEvent.mouseEnter(screen.getByTestId('country-south_africa'));
    expect(screen.getByTestId('map-tooltip')).toHaveTextContent('English');

    fireEvent.mouseLeave(screen.getByTestId('country-south_africa'));

    fireEvent.mouseEnter(screen.getByTestId('country-belgium'));
    expect(screen.getByTestId('map-tooltip')).toHaveTextContent('French');
  });
});
