import React from 'react';
import {render, screen} from '@testing-library/react';
import BackToHome from '../../app/[locale]/components/BackToHome';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
  useLocale: jest.fn(() => 'en'),
}));

// Mock next/navigation
const mockUsePathname = jest.fn(() => '/');
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock i18n navigation
jest.mock('../../lib/i18n/navigation', () => ({
  Link: ({children, href, ...props}: any) => <a href={href} {...props}>{children}</a>,
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({replace: jest.fn()})),
}));

describe('BackToHome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render back link on home page "/"', () => {
    mockUsePathname.mockReturnValue('/');
    render(<BackToHome />);
    expect(screen.queryByText(/back_home/)).not.toBeInTheDocument();
  });

  it('does not render back link on locale home "/en"', () => {
    mockUsePathname.mockReturnValue('/en');
    render(<BackToHome />);
    expect(screen.queryByText(/back_home/)).not.toBeInTheDocument();
  });

  it('does not render back link on fr locale home', () => {
    const {useLocale} = require('next-intl');
    (useLocale as jest.Mock).mockReturnValue('fr');
    mockUsePathname.mockReturnValue('/fr');
    render(<BackToHome />);
    expect(screen.queryByText(/back_home/)).not.toBeInTheDocument();
  });

  it('always renders footer with social links', () => {
    mockUsePathname.mockReturnValue('/');
    render(<BackToHome />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Komoot')).toBeInTheDocument();
  });

  it('always renders copyright', () => {
    mockUsePathname.mockReturnValue('/');
    render(<BackToHome />);
    expect(screen.getByText(/Alexandre Lienard/)).toBeInTheDocument();
  });

  it('renders back link on subpages', () => {
    mockUsePathname.mockReturnValue('/experience/Junior-42-Paris');
    render(<BackToHome />);

    const backLink = screen.getByText(/back_home/);
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders a left arrow symbol on subpages', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');
    render(<BackToHome />);

    const backLink = screen.getByText(/back_home/);
    expect(backLink.closest('a')?.textContent).toContain('\u2190');
  });

  it('renders on deeply nested paths', () => {
    mockUsePathname.mockReturnValue('/en/experience/some-job/details');
    render(<BackToHome />);
    expect(screen.getByText(/back_home/)).toBeInTheDocument();
  });
});
