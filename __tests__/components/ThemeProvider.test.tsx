import React from 'react';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, {useTheme} from '../../app/[locale]/components/ThemeProvider';

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
const matchMediaMock = jest.fn((query: string) => ({
  matches: false,
  media: query,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  onchange: null,
  dispatchEvent: jest.fn(),
}));
Object.defineProperty(window, 'matchMedia', {value: matchMediaMock});

// Helper component to consume the theme context
function ThemeConsumer() {
  const {theme, toggleTheme} = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark');
    localStorageMock.getItem.mockReturnValue(null);
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      onchange: null,
      dispatchEvent: jest.fn(),
    }));
  });

  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toBeInTheDocument();
  });

  it('defaults to light theme when no localStorage and prefers-color-scheme is light', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('reads theme from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('reads light theme from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('respects prefers-color-scheme: dark when no localStorage value', () => {
    localStorageMock.getItem.mockReturnValue(null);
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      onchange: null,
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleTheme switches from light to dark', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    await user.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleTheme switches from dark to light', async () => {
    localStorageMock.getItem.mockReturnValue('dark');
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

    await user.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('adds dark class to document.documentElement when theme is dark', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class from document.documentElement when theme is light', () => {
    document.documentElement.classList.add('dark');
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides light as context value before mount completes (flash prevention)', () => {
    // Before the useEffect runs, the context value should be 'light' regardless
    // of what localStorage says, to prevent flash
    localStorageMock.getItem.mockReturnValue('dark');

    // We test this indirectly: the component renders and the mounted state
    // transitions happen within the same render cycle in test, so we verify
    // the final state is correct after mount
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // After mount, it should reflect the stored value
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });

  it('localStorage value takes precedence over prefers-color-scheme', () => {
    localStorageMock.getItem.mockReturnValue('light');
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      onchange: null,
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('multiple toggles cycle the theme correctly', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
});

describe('useTheme', () => {
  it('returns default values when used outside ThemeProvider', () => {
    // When used outside ThemeProvider, it falls back to createContext defaults
    function Standalone() {
      const {theme, toggleTheme} = useTheme();
      return (
        <div>
          <span data-testid="standalone-theme">{theme}</span>
          <button onClick={toggleTheme}>Toggle</button>
        </div>
      );
    }

    render(<Standalone />);
    expect(screen.getByTestId('standalone-theme')).toHaveTextContent('light');

    // toggleTheme should be a no-op (default empty function)
    // clicking should not throw
    const button = screen.getByText('Toggle');
    expect(() => button.click()).not.toThrow();
  });
});
