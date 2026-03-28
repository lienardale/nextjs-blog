import React from 'react';
import {render, screen, act} from '@testing-library/react';
import ParallaxBackground from '../../app/[locale]/components/ParallaxBackground';

// Helper: mock window.matchMedia
function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mql = {
    matches,
    addEventListener: jest.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }),
    removeEventListener: jest.fn(),
  };
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockReturnValue(mql),
    writable: true,
    configurable: true,
  });
  return {
    mql,
    /** Simulate a media query change */
    triggerChange(newMatches: boolean) {
      mql.matches = newMatches;
      listeners.forEach((cb) => cb({matches: newMatches} as MediaQueryListEvent));
    },
  };
}

function simulateScroll(scrollY: number) {
  Object.defineProperty(window, 'scrollY', {value: scrollY, writable: true, configurable: true});
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('ParallaxBackground', () => {
  // Store original rAF to restore later
  const originalRAF = global.requestAnimationFrame;

  beforeEach(() => {
    jest.clearAllMocks();
    // Make rAF synchronous for testing
    global.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    };
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRAF;
  });

  describe('on desktop (width > 768px)', () => {
    beforeEach(() => mockMatchMedia(false));

    it('renders with bg-fixed class for CSS parallax', () => {
      const {container} = render(
        <ParallaxBackground as="header">
          <span>Hello</span>
        </ParallaxBackground>
      );
      const el = container.firstElementChild!;
      expect(el.className).toContain('bg-fixed');
      expect(el.className).toContain('custom-img');
    });

    it('does NOT render a separate background div', () => {
      render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      expect(screen.queryByTestId('parallax-bg')).toBeNull();
    });

    it('does NOT attach a scroll listener', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      const scrollCalls = addSpy.mock.calls.filter(([event]) => event === 'scroll');
      expect(scrollCalls).toHaveLength(0);
      addSpy.mockRestore();
    });

    it('renders children', () => {
      render(
        <ParallaxBackground>
          <span>Child content</span>
        </ParallaxBackground>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders as the specified element type', () => {
      const {container} = render(
        <ParallaxBackground as="header">
          <span>Header</span>
        </ParallaxBackground>
      );
      expect(container.querySelector('header')).not.toBeNull();

      const {container: c2} = render(
        <ParallaxBackground as="section">
          <span>Section</span>
        </ParallaxBackground>
      );
      expect(c2.querySelector('section')).not.toBeNull();
    });

    it('passes className to the element', () => {
      const {container} = render(
        <ParallaxBackground className="flex items-center">
          <span>Content</span>
        </ParallaxBackground>
      );
      expect(container.firstElementChild!.className).toContain('flex');
      expect(container.firstElementChild!.className).toContain('items-center');
    });
  });

  describe('on mobile (width <= 768px)', () => {
    beforeEach(() => mockMatchMedia(true));

    it('does NOT use bg-fixed class', () => {
      const {container} = render(
        <ParallaxBackground as="section">
          <span>Content</span>
        </ParallaxBackground>
      );
      const el = container.firstElementChild!;
      expect(el.className).not.toContain('bg-fixed');
    });

    it('renders a positioned background div for parallax', () => {
      render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      const bg = screen.getByTestId('parallax-bg');
      expect(bg).toBeInTheDocument();
      expect(bg.style.backgroundImage).toContain('unsplash');
      expect(bg.className).toContain('absolute');
    });

    it('attaches a scroll listener', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      const scrollCalls = addSpy.mock.calls.filter(([event]) => event === 'scroll');
      expect(scrollCalls.length).toBeGreaterThan(0);
      addSpy.mockRestore();
    });

    it('applies transform on scroll', () => {
      render(
        <ParallaxBackground speed={0.5}>
          <span>Content</span>
        </ParallaxBackground>
      );
      const bg = screen.getByTestId('parallax-bg');

      // Mock getBoundingClientRect to simulate the container being 200px above viewport
      const container = bg.parentElement!;
      container.getBoundingClientRect = jest.fn().mockReturnValue({top: -200});

      simulateScroll(500);

      // offset = -(-200) * 0.5 = 100
      expect(bg.style.transform).toBe('translateY(100px)');
    });

    it('renders children above the background layer', () => {
      render(
        <ParallaxBackground>
          <span>Above content</span>
        </ParallaxBackground>
      );
      expect(screen.getByText('Above content')).toBeInTheDocument();
      // Content is in a relative z-1 div
      const contentDiv = screen.getByText('Above content').closest('div.relative');
      expect(contentDiv).not.toBeNull();
    });

    it('cleans up scroll listener on unmount', () => {
      const removeSpy = jest.spyOn(window, 'removeEventListener');
      const {unmount} = render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      unmount();
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeSpy.mockRestore();
    });

    it('has overflow hidden on the container', () => {
      const {container} = render(
        <ParallaxBackground>
          <span>Content</span>
        </ParallaxBackground>
      );
      expect(container.firstElementChild!.className).toContain('overflow-hidden');
    });
  });
});
