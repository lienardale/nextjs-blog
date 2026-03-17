import React from 'react';
import {render, screen} from '@testing-library/react';
import KomootEmbed from '../../app/[locale]/components/KomootEmbed';

describe('KomootEmbed', () => {
  it('renders with data-testid', () => {
    render(<KomootEmbed tourId="123456" />);
    expect(screen.getByTestId('komoot-embed')).toBeInTheDocument();
  });

  it('renders iframe with correct src', () => {
    render(<KomootEmbed tourId="1830962536" title="Angers → Mesquer" />);
    const iframe = screen.getByTitle('Angers → Mesquer');
    expect(iframe).toHaveAttribute('src', 'https://www.komoot.com/tour/1830962536/embed?profile=1');
  });

  it('has lazy loading', () => {
    render(<KomootEmbed tourId="123456" />);
    const iframe = screen.getByTitle('Komoot tour 123456');
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });
});
