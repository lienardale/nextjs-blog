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

  it('renders nothing when pathname is "/"', () => {
    mockUsePathname.mockReturnValue('/');
    const {container} = render(<BackToHome />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when pathname matches locale (e.g., "/en")', () => {
    mockUsePathname.mockReturnValue('/en');
    const {container} = render(<BackToHome />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when pathname matches fr locale', () => {
    const {useLocale} = require('next-intl');
    (useLocale as jest.Mock).mockReturnValue('fr');
    mockUsePathname.mockReturnValue('/fr');

    const {container} = render(<BackToHome />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when pathname matches de locale', () => {
    const {useLocale} = require('next-intl');
    (useLocale as jest.Mock).mockReturnValue('de');
    mockUsePathname.mockReturnValue('/de');

    const {container} = render(<BackToHome />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when pathname matches es locale', () => {
    const {useLocale} = require('next-intl');
    (useLocale as jest.Mock).mockReturnValue('es');
    mockUsePathname.mockReturnValue('/es');

    const {container} = render(<BackToHome />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the link when on a subpage', () => {
    mockUsePathname.mockReturnValue('/experience/Junior-42-Paris');
    render(<BackToHome />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the translated "back_home" text', () => {
    mockUsePathname.mockReturnValue('/experience/some-page');
    render(<BackToHome />);

    // The mock useTranslations returns the key itself
    expect(screen.getByText(/back_home/)).toBeInTheDocument();
  });

  it('renders a left arrow symbol', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');
    render(<BackToHome />);

    const link = screen.getByRole('link');
    // The component renders &larr; which is the left arrow character
    expect(link.textContent).toContain('\u2190');
  });

  it('link has correct hover classes', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');
    render(<BackToHome />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('hover:text-gray-600');
  });

  it('wraps link in a div with mt-12 class', () => {
    mockUsePathname.mockReturnValue('/posts/some-post');
    const {container} = render(<BackToHome />);

    const wrapper = container.querySelector('.mt-12');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.tagName).toBe('DIV');
  });

  it('renders on deeply nested paths', () => {
    mockUsePathname.mockReturnValue('/en/experience/some-job/details');
    render(<BackToHome />);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
