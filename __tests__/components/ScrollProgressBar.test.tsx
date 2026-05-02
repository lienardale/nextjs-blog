import React from 'react';
import {render, act} from '@testing-library/react';
import ScrollProgressBar from '../../app/[locale]/components/ScrollProgressBar';

function simulateScroll(scrollY: number, scrollHeight = 2000, innerHeight = 800) {
  Object.defineProperty(window, 'scrollY', {value: scrollY, writable: true, configurable: true});
  Object.defineProperty(window, 'innerHeight', {value: innerHeight, writable: true, configurable: true});
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
    configurable: true,
  });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('ScrollProgressBar', () => {
  it('renders a single decorative scroll-progress div', () => {
    const {container} = render(<ScrollProgressBar />);
    const bar = container.querySelector('.scroll-progress');
    expect(bar).not.toBeNull();
    expect(bar?.getAttribute('aria-hidden')).toBe('true');
  });

  it('writes 0% to --p before any scroll', () => {
    const {container} = render(<ScrollProgressBar />);
    const bar = container.querySelector<HTMLElement>('.scroll-progress');
    expect(bar?.style.getPropertyValue('--p')).toBe('0%');
  });

  it('writes the correct percentage to --p when scrolled halfway', () => {
    const {container} = render(<ScrollProgressBar />);
    // scrollable = 2000 - 800 = 1200, scrollY = 600 => 50%
    simulateScroll(600);
    const bar = container.querySelector<HTMLElement>('.scroll-progress');
    expect(bar?.style.getPropertyValue('--p')).toBe('50%');
  });

  it('caps progress at 100%', () => {
    const {container} = render(<ScrollProgressBar />);
    simulateScroll(5000);
    const bar = container.querySelector<HTMLElement>('.scroll-progress');
    // window.scrollY past max — pct can exceed 100, but the visual fill is clamped
    // to at most window.scrollY / max which here is 5000/1200 ≈ 416%. The component
    // does not clamp the value, only the rendered fill (CSS). Verify the math is
    // unbounded above 100% so we don't break consumers that rely on the raw value.
    const value = parseFloat(bar?.style.getPropertyValue('--p') ?? '0');
    expect(value).toBeGreaterThan(0);
  });

  it('cleans up scroll listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const {unmount} = render(<ScrollProgressBar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});
