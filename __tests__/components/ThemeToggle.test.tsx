import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../../app/[locale]/components/ThemeToggle';
import ThemeProvider from '../../app/[locale]/components/ThemeProvider';

// Mock heroicons
jest.mock('@heroicons/react/24/solid', () => ({
  SunIcon: (props: any) => <svg data-testid="sun-icon" {...props} />,
  MoonIcon: (props: any) => <svg data-testid="moon-icon" {...props} />,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn((query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    onchange: null,
    dispatchEvent: jest.fn(),
  })),
});

function renderWithTheme(theme: 'light' | 'dark' = 'light') {
  localStorageMock.getItem.mockReturnValue(theme);
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark');
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders a button', () => {
    renderWithTheme('light');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows MoonIcon in light mode', () => {
    renderWithTheme('light');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('shows SunIcon in dark mode', () => {
    renderWithTheme('dark');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('has aria-label "Switch to dark mode" in light mode', () => {
    renderWithTheme('light');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has aria-label "Switch to light mode" in dark mode', () => {
    renderWithTheme('dark');
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('clicking toggles from light to dark', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('clicking toggles from dark to light', async () => {
    const user = userEvent.setup();
    renderWithTheme('dark');

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has correct CSS classes on the button', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-md', 'p-2', 'transition-colors');
  });

  it('double toggle returns to original state', async () => {
    const user = userEvent.setup();
    renderWithTheme('light');

    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});
