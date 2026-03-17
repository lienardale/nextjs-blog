import React from 'react';
import {render, screen, act, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CopyButton from '../../app/[locale]/components/CopyButton';

// Mock @heroicons/react
jest.mock('@heroicons/react/24/outline', () => ({
  ClipboardIcon: (props: any) => <svg data-testid="clipboard-icon" {...props} />,
  CheckIcon: (props: any) => <svg data-testid="check-icon" {...props} />,
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

  it('renders a button with clipboard icon', () => {
    render(<CopyButton code="const x = 1;" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Copy code');
    expect(screen.getByTestId('clipboard-icon')).toBeInTheDocument();
  });

  it('copies code to clipboard on click', async () => {
    render(<CopyButton code="const x = 1;" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(mockWriteText).toHaveBeenCalledWith('const x = 1;');
  });

  it('shows check icon and "Copied" label after click', async () => {
    render(<CopyButton code="hello" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copied');
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('reverts to clipboard icon after 2 seconds', async () => {
    jest.useFakeTimers();
    render(<CopyButton code="hello" />);

    await act(async () => {
      screen.getByRole('button').click();
    });

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId('clipboard-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy code');

    jest.useRealTimers();
  });

  it('has hover styling classes', () => {
    render(<CopyButton code="x" />);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-gray-200');
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
