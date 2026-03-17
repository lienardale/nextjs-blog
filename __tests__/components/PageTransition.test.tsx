import React from 'react';
import {render, screen, act} from '@testing-library/react';
import PageTransition from '../../app/[locale]/components/PageTransition';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({replace: jest.fn(), push: jest.fn()})),
}));

describe('PageTransition component', () => {
  let rafCallbacks: Array<FrameRequestCallback>;
  let rafIdCounter: number;

  beforeEach(() => {
    rafCallbacks = [];
    rafIdCounter = 0;

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return ++rafIdCounter;
    });

    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function flushRAF() {
    const callbacks = [...rafCallbacks];
    rafCallbacks = [];
    callbacks.forEach((cb) => cb(performance.now()));
  }

  it('renders children', () => {
    render(
      <PageTransition>
        <p>Page content</p>
      </PageTransition>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <PageTransition>
        <p>First</p>
        <p>Second</p>
      </PageTransition>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('initially has opacity-0 class (before requestAnimationFrame fires)', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    const wrapper = screen.getByText('Content').parentElement!;
    expect(wrapper).toHaveClass('opacity-0');
    expect(wrapper).not.toHaveClass('opacity-100');
  });

  it('has opacity-100 class after requestAnimationFrame fires', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );

    act(() => {
      flushRAF();
    });

    const wrapper = screen.getByText('Content').parentElement!;
    expect(wrapper).toHaveClass('opacity-100');
    expect(wrapper).not.toHaveClass('opacity-0');
  });

  it('has transition-opacity class for CSS transitions', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    const wrapper = screen.getByText('Content').parentElement!;
    expect(wrapper).toHaveClass('transition-opacity');
    expect(wrapper).toHaveClass('duration-300');
    expect(wrapper).toHaveClass('ease-out');
  });

  it('calls requestAnimationFrame on mount', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('resets to opacity-0 when pathname changes and then transitions to opacity-100', () => {
    const {usePathname} = require('next/navigation');

    // Start with path '/'
    usePathname.mockReturnValue('/');
    const {rerender} = render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );

    act(() => {
      flushRAF();
    });

    const wrapper = screen.getByText('Content').parentElement!;
    expect(wrapper).toHaveClass('opacity-100');

    // Change the pathname
    usePathname.mockReturnValue('/about');
    rerender(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );

    // After re-render with new pathname, it should reset to opacity-0
    // because the effect sets isVisible to false before scheduling rAF
    expect(wrapper).toHaveClass('opacity-0');

    // After rAF fires, it should transition to opacity-100
    act(() => {
      flushRAF();
    });
    expect(wrapper).toHaveClass('opacity-100');
  });

  it('cancels the animation frame on unmount', () => {
    const {unmount} = render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );

    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('wraps children in a div element', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    const wrapper = screen.getByText('Content').parentElement!;
    expect(wrapper.tagName).toBe('DIV');
  });
});
