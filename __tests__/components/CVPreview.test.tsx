import React from 'react';
import {render, screen} from '@testing-library/react';
import CVPreview from '../../app/[locale]/components/CVPreview';

// Mock next-intl/server
jest.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => {
      const map: Record<string, string> = {
        cv_download: 'Download CV',
        cv_open: 'Open in new tab',
      };
      return map[key] ?? key;
    }),
}));

describe('CVPreview', () => {
  const cvUrl = 'https://lienardale.github.io/markdown-cv/';

  it('renders iframe with correct src', async () => {
    render(await CVPreview({url: cvUrl, locale: 'en'}));
    const iframe = screen.getByTestId('cv-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', cvUrl);
  });

  it('renders open button with correct href', async () => {
    render(await CVPreview({url: cvUrl, locale: 'en'}));
    const button = screen.getByTestId('cv-open-button');
    expect(button).toHaveAttribute('href', cvUrl);
    expect(button).toHaveAttribute('target', '_blank');
  });

  it('renders open button text', async () => {
    render(await CVPreview({url: cvUrl, locale: 'en'}));
    expect(screen.getByText('Open in new tab')).toBeInTheDocument();
  });

  it('has data-testid="cv-preview"', async () => {
    render(await CVPreview({url: cvUrl, locale: 'en'}));
    expect(screen.getByTestId('cv-preview')).toBeInTheDocument();
  });

  it('iframe has title attribute for accessibility', async () => {
    render(await CVPreview({url: cvUrl, locale: 'en'}));
    const iframe = screen.getByTestId('cv-iframe');
    expect(iframe).toHaveAttribute('title', 'CV');
  });
});
