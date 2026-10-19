import React from 'react';
import {render, screen} from '@testing-library/react';
import ExternalRow from '../../app/[locale]/components/ExternalRow';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) =>
    key === 'opens_new_tab' ? '(opens in a new tab)' : key,
  ),
}));

describe('ExternalRow', () => {
  it('opens a web link in a new tab and announces it', () => {
    render(
      <ExternalRow href="https://github.com/lienardale/mini_rt" className="grid-cols-[minmax(0,1fr)_auto]">
        <span>mini_rt</span>
      </ExternalRow>,
    );

    const link = screen.getByRole('link', {name: 'mini_rt (opens in a new tab)'});
    expect(link).toHaveAttribute('href', 'https://github.com/lienardale/mini_rt');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass('row', 'grid-cols-[minmax(0,1fr)_auto]');
  });

  it('keeps the arrow out of the accessible name', () => {
    render(
      <ExternalRow href="https://example.com" className="">
        <span>Example</span>
      </ExternalRow>,
    );

    expect(screen.getByText('↗')).toHaveAttribute('aria-hidden', 'true');
  });

  it('leaves mailto links in the same tab, without the new-tab notice', () => {
    render(
      <ExternalRow href="mailto:alienard.dev@gmail.com" className="">
        <span>Email</span>
      </ExternalRow>,
    );

    const link = screen.getByRole('link', {name: 'Email'});
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
    expect(screen.queryByText('(opens in a new tab)')).not.toBeInTheDocument();
    expect(screen.getByText('↗')).toBeInTheDocument();
  });
});
