import React from 'react';
import {render, screen} from '@testing-library/react';
import Date from '../../app/[locale]/components/Date';

describe('Date component', () => {
  it('renders a <time> element', () => {
    render(<Date dateString="2020-01-01" />);
    const timeEl = screen.getByText(/2020/);
    expect(timeEl.tagName).toBe('TIME');
  });

  it('sets the correct dateTime attribute', () => {
    render(<Date dateString="2023-06-15" />);
    const timeEl = screen.getByText(/2023/);
    expect(timeEl).toHaveAttribute('dateTime', '2023-06-15');
  });

  it('formats the date in English by default', () => {
    render(<Date dateString="2020-01-01" />);
    expect(screen.getByText('January 1, 2020')).toBeInTheDocument();
  });

  it('formats the date correctly for another English date', () => {
    render(<Date dateString="2023-12-25" />);
    expect(screen.getByText('December 25, 2023')).toBeInTheDocument();
  });

  it('formats the date in English when locale is explicitly "en"', () => {
    render(<Date dateString="2020-01-01" locale="en" />);
    expect(screen.getByText('January 1, 2020')).toBeInTheDocument();
  });

  it('formats the date in French locale', () => {
    render(<Date dateString="2020-01-01" locale="fr" />);
    expect(screen.getByText('janvier 1, 2020')).toBeInTheDocument();
  });

  it('formats the date in German locale', () => {
    render(<Date dateString="2020-01-01" locale="de" />);
    expect(screen.getByText('Januar 1, 2020')).toBeInTheDocument();
  });

  it('formats the date in Spanish locale', () => {
    render(<Date dateString="2020-01-01" locale="es" />);
    expect(screen.getByText('enero 1, 2020')).toBeInTheDocument();
  });

  it('falls back to English for an unsupported locale', () => {
    render(<Date dateString="2020-01-01" locale="ja" />);
    expect(screen.getByText('January 1, 2020')).toBeInTheDocument();
  });

  it('falls back to English for an empty-string locale', () => {
    render(<Date dateString="2020-01-01" locale="" />);
    expect(screen.getByText('January 1, 2020')).toBeInTheDocument();
  });

  it('handles a date at the end of the year', () => {
    render(<Date dateString="2021-12-31" locale="en" />);
    expect(screen.getByText('December 31, 2021')).toBeInTheDocument();
  });

  it('handles a leap-year date', () => {
    render(<Date dateString="2024-02-29" locale="en" />);
    expect(screen.getByText('February 29, 2024')).toBeInTheDocument();
  });
});
