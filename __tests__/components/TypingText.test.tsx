import React from 'react';
import {render, screen, act} from '@testing-library/react';
import TypingText from '../../app/[locale]/components/TypingText';

describe('TypingText component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initially renders empty text (before any interval fires)', () => {
    render(<TypingText text="Hello" />);
    // The outer span contains the text plus the cursor span
    const spans = document.querySelectorAll('span');
    // The first span is the wrapper; its textContent starts empty (only the cursor child)
    expect(spans[0].textContent).toBe('');
  });

  it('shows one character after the first interval tick', () => {
    render(<TypingText text="Hello" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('H')).toBeInTheDocument();
  });

  it('shows partial text after multiple ticks', () => {
    render(<TypingText text="Hello" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60 * 3);
    });
    expect(screen.getByText('Hel')).toBeInTheDocument();
  });

  it('renders the full text after all ticks complete', () => {
    render(<TypingText text="Hello" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60 * 5);
    });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders the full text for a longer string', () => {
    const text = 'Hello, World!';
    render(<TypingText text={text} speed={50} />);
    act(() => {
      jest.advanceTimersByTime(50 * text.length);
    });
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('shows the cursor span at all times', () => {
    const {container} = render(<TypingText text="Hi" />);
    // The cursor is the second span (child of the outer span)
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).toBeInTheDocument();
    expect(cursorSpan).toHaveClass('inline-block');
  });

  it('cursor does NOT have animate-blink class before animation completes', () => {
    const {container} = render(<TypingText text="Hi" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60); // only 1 of 2 chars
    });
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).not.toHaveClass('animate-blink');
  });

  it('cursor has animate-blink class after animation completes', () => {
    const {container} = render(<TypingText text="Hi" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60 * 2); // all chars done
    });
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).toHaveClass('animate-blink');
  });

  it('respects custom speed prop', () => {
    render(<TypingText text="AB" speed={100} />);
    // After 100ms, only 'A' should be displayed
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('A')).toBeInTheDocument();

    // After another 100ms, 'AB' should be displayed
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('uses default speed of 60 when speed prop is not provided', () => {
    render(<TypingText text="XY" />);
    // After 60ms, 'X' should appear
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('handles a single-character string', () => {
    const {container} = render(<TypingText text="A" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('A')).toBeInTheDocument();
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).toHaveClass('animate-blink');
  });

  it('handles an empty string', () => {
    const {container} = render(<TypingText text="" speed={60} />);
    // With empty text, the interval fires once with i=1 which exceeds text.length=0
    // so it should immediately finish
    act(() => {
      jest.advanceTimersByTime(60);
    });
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).toHaveClass('animate-blink');
  });

  it('clears interval on unmount (no warnings)', () => {
    const {unmount} = render(<TypingText text="Hello World" speed={60} />);
    act(() => {
      jest.advanceTimersByTime(60 * 3);
    });
    // Unmount while animation is still in progress
    unmount();
    // Advancing timers after unmount should not cause errors
    act(() => {
      jest.advanceTimersByTime(60 * 20);
    });
  });

  it('resets animation when text prop changes', () => {
    const {rerender, container} = render(<TypingText text="AB" speed={60} />);
    // Complete the first text
    act(() => {
      jest.advanceTimersByTime(60 * 2);
    });
    expect(screen.getByText('AB')).toBeInTheDocument();

    // Change the text prop
    rerender(<TypingText text="CD" speed={60} />);
    // After one tick of the new text
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('C')).toBeInTheDocument();

    // Cursor should NOT blink yet (only 1 of 2 chars)
    const cursorSpan = container.querySelector('span > span');
    expect(cursorSpan).not.toHaveClass('animate-blink');

    // Complete the new text
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('CD')).toBeInTheDocument();
    expect(cursorSpan).toHaveClass('animate-blink');
  });
});
