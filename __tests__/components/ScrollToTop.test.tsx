import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import ScrollToTop from '../../app/[locale]/components/ScrollToTop';

// Mock the heroicons module
jest.mock('@heroicons/react/24/outline', () => ({
  ArrowUpIcon: (props: any) => <svg data-testid="arrow-up-icon" {...props} />,
}));

describe('ScrollToTop component', () => {
  let scrollToMock: jest.Mock;

  beforeEach(() => {
    scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    // Reset scrollY to 0
    Object.defineProperty(window, 'scrollY', {value: 0, writable: true, configurable: true});
  });

  it('renders a button element', () => {
    render(<ScrollToTop />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label "Scroll to top"', () => {
    render(<ScrollToTop />);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('is hidden initially (has opacity-0 class)', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-0');
    expect(button).not.toHaveClass('opacity-100');
  });

  it('has pointer-events-none when hidden', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('becomes visible after scrolling past 480px', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    // Simulate scrolling past 480px
    Object.defineProperty(window, 'scrollY', {value: 481, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).toHaveClass('opacity-100');
    expect(button).not.toHaveClass('opacity-0');
  });

  it('accepts clicks again once visible', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    Object.defineProperty(window, 'scrollY', {value: 600, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).not.toHaveClass('pointer-events-none');
  });

  it('remains hidden when scrollY is exactly 480', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    Object.defineProperty(window, 'scrollY', {value: 480, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).toHaveClass('opacity-0');
  });

  it('hides again when scrolling back up below 480px', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    // Scroll down
    Object.defineProperty(window, 'scrollY', {value: 700, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });
    expect(button).toHaveClass('opacity-100');

    // Scroll back up
    Object.defineProperty(window, 'scrollY', {value: 100, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });
    expect(button).toHaveClass('opacity-0');
  });

  it('calls window.scrollTo with smooth behavior on click', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
  });

  it('calls window.scrollTo exactly once per click', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledTimes(2);
  });

  it('renders the ArrowUpIcon', () => {
    render(<ScrollToTop />);
    expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
  });

  it('has fixed positioning classes', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-5');
    expect(button).toHaveClass('right-5');
  });

  it('has correct styling classes', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('size-9');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('border', 'border-rule');
    expect(button).toHaveClass('bg-bg');
    expect(button.className).not.toMatch(/shadow/);
  });

  it('removes the scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const {unmount} = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
