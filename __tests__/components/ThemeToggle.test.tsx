import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    if (key === 'to_light') return 'Switch to light mode';
    if (key === 'to_dark') return 'Switch to dark mode';
    return key;
  }),
}));

// Mock @heroicons/react
jest.mock('@heroicons/react/24/outline', () => ({
  SunIcon: (props: any) => <svg data-testid="sun-icon" {...props} />,
  MoonIcon: (props: any) => <svg data-testid="moon-icon" {...props} />,
}));

type MediaListener = () => void;

function mockMatchMedia(prefersDark: boolean) {
  const mediaListeners = new Set<MediaListener>();
  const media = {
    matches: prefersDark,
    addEventListener: (_: string, listener: MediaListener) => mediaListeners.add(listener),
    removeEventListener: (_: string, listener: MediaListener) => mediaListeners.delete(listener),
  };
  window.matchMedia = jest.fn(() => media) as unknown as typeof window.matchMedia;
  return {
    setPrefersDark(value: boolean) {
      media.matches = value;
      mediaListeners.forEach((listener) => listener());
    },
  };
}

// lib/theme keeps the tab's choice in module state, so each test loads a
// fresh copy of it (and of the component bound to it) — but against the one
// React instance the renderer uses.
function loadToggle() {
  let ThemeToggle: React.ComponentType = () => null;
  jest.isolateModules(() => {
    jest.doMock('react', () => React);
    ThemeToggle = require('../../app/[locale]/components/ThemeToggle').default;
  });
  return ThemeToggle;
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-palette');
    document.documentElement.className = '';
    mockMatchMedia(false);
  });

  it('follows the OS preference when nothing is stored', () => {
    mockMatchMedia(true);
    const ThemeToggle = loadToggle();
    render(<ThemeToggle />);

    expect(document.documentElement.dataset.palette).toBe('b');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('prefers the stored choice over the OS preference', () => {
    mockMatchMedia(true);
    localStorage.setItem('al-theme', 'light');
    const ThemeToggle = loadToggle();
    render(<ThemeToggle />);

    expect(document.documentElement.dataset.palette).toBe('a');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('flips the palette, the label and the stored choice on click', () => {
    const ThemeToggle = loadToggle();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(document.documentElement.dataset.palette).toBe('b');
    expect(localStorage.getItem('al-theme')).toBe('dark');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    fireEvent.click(button);
    expect(document.documentElement.dataset.palette).toBe('a');
    expect(localStorage.getItem('al-theme')).toBe('light');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('puts the palette back when it remounts after <html> was reset', () => {
    const ThemeToggle = loadToggle();
    const {unmount} = render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    unmount();

    // What React does to <html> when a locale switch remounts the layout.
    document.documentElement.removeAttribute('data-palette');
    render(<ThemeToggle />);

    expect(document.documentElement.dataset.palette).toBe('b');
  });

  it('tracks OS changes until the user has chosen', () => {
    const os = mockMatchMedia(false);
    const ThemeToggle = loadToggle();
    render(<ThemeToggle />);

    act(() => os.setPrefersDark(true));
    expect(document.documentElement.dataset.palette).toBe('b');

    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.dataset.palette).toBe('a');

    act(() => os.setPrefersDark(false));
    act(() => os.setPrefersDark(true));
    expect(document.documentElement.dataset.palette).toBe('a');
  });

  it('renders both icons so CSS can pick one before hydration', () => {
    const ThemeToggle = loadToggle();
    render(<ThemeToggle />);

    expect(screen.getByTestId('sun-icon')).toHaveClass('icon-sun');
    expect(screen.getByTestId('moon-icon')).toHaveClass('icon-moon');
  });
});
