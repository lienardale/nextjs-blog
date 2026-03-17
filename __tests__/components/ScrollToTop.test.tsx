import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import ScrollToTop from '../../app/[locale]/components/ScrollToTop';

// Mock the heroicons module
jest.mock('@heroicons/react/24/solid', () => ({
  ChevronUpIcon: (props: any) => <svg data-testid="chevron-up-icon" {...props} />,
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

  it('has translate-y-4 when hidden', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('translate-y-4');
  });

  it('becomes visible after scrolling past 300px', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    // Simulate scrolling past 300px
    Object.defineProperty(window, 'scrollY', {value: 301, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).toHaveClass('opacity-100');
    expect(button).not.toHaveClass('opacity-0');
  });

  it('has translate-y-0 when visible', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    Object.defineProperty(window, 'scrollY', {value: 400, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).toHaveClass('translate-y-0');
  });

  it('remains hidden when scrollY is exactly 300', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    Object.defineProperty(window, 'scrollY', {value: 300, writable: true, configurable: true});
    act(() => {
      fireEvent.scroll(window);
    });

    expect(button).toHaveClass('opacity-0');
  });

  it('hides again when scrolling back up below 300px', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');

    // Scroll down
    Object.defineProperty(window, 'scrollY', {value: 500, writable: true, configurable: true});
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

  it('renders the ChevronUpIcon', () => {
    render(<ScrollToTop />);
    expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument();
  });

  it('has fixed positioning classes', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-6');
    expect(button).toHaveClass('right-6');
  });

  it('has correct styling classes', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('shadow-lg');
  });

  it('removes the scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const {unmount} = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
