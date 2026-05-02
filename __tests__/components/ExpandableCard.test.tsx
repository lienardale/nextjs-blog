import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableCard from '../../app/[locale]/components/ExpandableCard';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      show_more: 'Show more',
      show_less: 'Show less',
    };
    return translations[key] ?? key;
  },
}));

describe('ExpandableCard', () => {
  const summary = <p>This is the summary</p>;
  const children = <p>This is the full content</p>;

  it('renders summary text', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    expect(screen.getByText('This is the summary')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    expect(screen.getByText('This is the full content')).toBeInTheDocument();
  });

  it('starts collapsed with "Show more" button', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    expect(screen.getByRole('button', {name: /show more/i})).toBeInTheDocument();
  });

  it('has aria-expanded="false" initially', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands on click and shows "Show less"', async () => {
    const user = userEvent.setup();
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('collapses on second click', async () => {
    const user = userEvent.setup();
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('has aria-controls linking button to content region', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    const button = screen.getByRole('button');
    const controlsId = button.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(screen.getByRole('region')).toHaveAttribute('id', controlsId);
  });

  it('marks the region as collapsed by default', () => {
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    const region = screen.getByRole('region');
    expect(region.className).toContain('is-collapsed');
    expect(region.className).not.toContain('is-expanded');
  });

  it('marks the region as expanded after click', async () => {
    const user = userEvent.setup();
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);

    await user.click(screen.getByRole('button'));

    const region = screen.getByRole('region');
    expect(region.className).toContain('is-expanded');
    expect(region.className).not.toContain('is-collapsed');
  });

  it('rotates the chevron via aria-expanded on the button', async () => {
    const user = userEvent.setup();
    render(<ExpandableCard summary={summary}>{children}</ExpandableCard>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
