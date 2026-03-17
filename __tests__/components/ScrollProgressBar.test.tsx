import React from 'react';
import {render, screen, act} from '@testing-library/react';
import ScrollProgressBar from '../../app/[locale]/components/ScrollProgressBar';

function simulateScroll(scrollY: number, scrollHeight = 2000, innerHeight = 800) {
  Object.defineProperty(window, 'scrollY', {value: scrollY, writable: true, configurable: true});
  Object.defineProperty(window, 'innerHeight', {value: innerHeight, writable: true, configurable: true});
  Object.defineProperty(document.documentElement, 'scrollHeight', {value: scrollHeight, writable: true, configurable: true});
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('ScrollProgressBar', () => {
  it('renders nothing when progress is 0', () => {
    simulateScroll(0);
    const {container} = render(<ScrollProgressBar />);
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
  });

  it('renders progress bar when scrolled', () => {
    render(<ScrollProgressBar />);
    simulateScroll(600);

    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveClass('fixed', 'top-0', 'left-0', 'z-50', 'h-1');
  });

  it('calculates correct progress percentage', () => {
    render(<ScrollProgressBar />);
    // scrollable = 2000 - 800 = 1200, scrollY = 600 => 50%
    simulateScroll(600);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar.style.width).toBe('50%');
  });

  it('caps progress at 100%', () => {
    render(<ScrollProgressBar />);
    simulateScroll(1500);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(bar.style.width).toBe('100%');
  });

  it('has correct aria attributes', () => {
    render(<ScrollProgressBar />);
    simulateScroll(300);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('has theme-aware classes', () => {
    render(<ScrollProgressBar />);
    simulateScroll(100);

    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveClass('bg-blue-600');
  });

  it('cleans up scroll listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const {unmount} = render(<ScrollProgressBar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});
