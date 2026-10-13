import React from 'react';
import {render, screen, act} from '@testing-library/react';
import CopyButton from '../../app/[locale]/components/CopyButton';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      code_copy: 'Copy',
      code_copied: 'Copied',
    };
    return map[key] ?? key;
  },
}));

// Setup clipboard mock globally
const mockWriteText = jest.fn(() => Promise.resolve());
Object.defineProperty(global.navigator, 'clipboard', {
  value: {writeText: mockWriteText},
  configurable: true,
});

describe('CopyButton', () => {
  beforeEach(() => {
    mockWriteText.mockClear();
  });

  it('renders a text button labelled "Copy"', () => {
    render(<CopyButton code="const x = 1;" />);
    expect(screen.getByRole('button', {name: 'Copy'})).toBeInTheDocument();
  });

  it('copies code to clipboard on click', async () => {
    render(<CopyButton code="const x = 1;" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(mockWriteText).toHaveBeenCalledWith('const x = 1;');
  });

  it('shows "Copied" after click', async () => {
    render(<CopyButton code="hello" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(screen.getByRole('button', {name: 'Copied'})).toBeInTheDocument();
  });

  it('reverts to "Copy" after 1.4 seconds', async () => {
    jest.useFakeTimers();
    render(<CopyButton code="hello" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    act(() => {
      jest.advanceTimersByTime(1399);
    });
    expect(screen.getByRole('button', {name: 'Copied'})).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByRole('button', {name: 'Copy'})).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('is a bordered text button, not an icon', () => {
    const {container} = render(<CopyButton code="x" />);
    expect(screen.getByRole('button')).toHaveClass('border', 'border-rule', 'font-mono');
    expect(container.querySelector('svg')).toBeNull();
  });

  it('handles empty code string', async () => {
    render(<CopyButton code="" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(mockWriteText).toHaveBeenCalledWith('');
  });

  it('handles multiline code', async () => {
    const code = 'line1\nline2\nline3';
    render(<CopyButton code={code} />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(mockWriteText).toHaveBeenCalledWith(code);
  });
});
