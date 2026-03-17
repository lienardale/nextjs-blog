import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import TiltCard from '../../app/[locale]/components/TiltCard';

describe('TiltCard component', () => {
  it('renders children', () => {
    render(
      <TiltCard>
        <p>Card content</p>
      </TiltCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <TiltCard>
        <p>First</p>
        <p>Second</p>
      </TiltCard>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('has perspective transform style by default', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;
    expect(cardDiv.style.transform).toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');
  });

  it('has transition-transform CSS class', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;
    expect(cardDiv).toHaveClass('transition-transform');
    expect(cardDiv).toHaveClass('duration-200');
    expect(cardDiv).toHaveClass('ease-out');
    expect(cardDiv).toHaveClass('will-change-transform');
  });

  it('updates transform on mouse move', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    // Mock getBoundingClientRect to provide known dimensions
    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Move mouse to top-left corner (should produce non-zero rotation)
    fireEvent.mouseMove(cardDiv, {clientX: 0, clientY: 0});

    const transform = cardDiv.style.transform;
    expect(transform).toContain('perspective(600px)');
    expect(transform).toContain('rotateX');
    expect(transform).toContain('rotateY');
    // The values should NOT be 0deg since we moved to the corner
    expect(transform).not.toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');
  });

  it('applies correct rotation values based on mouse position', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Move to center - should result in 0deg rotation
    fireEvent.mouseMove(cardDiv, {clientX: 100, clientY: 100});
    expect(cardDiv.style.transform).toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');
  });

  it('applies negative rotateY when mouse is to the left of center', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Mouse at left edge, vertical center
    fireEvent.mouseMove(cardDiv, {clientX: 0, clientY: 100});
    const transform = cardDiv.style.transform;
    // rotateY should be negative (left of center), rotateX should be 0
    expect(transform).toBe('perspective(600px) rotateX(0deg) rotateY(-8deg)');
  });

  it('applies positive rotateX when mouse is above center', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Mouse at horizontal center, top edge
    fireEvent.mouseMove(cardDiv, {clientX: 100, clientY: 0});
    const transform = cardDiv.style.transform;
    // y=0 means (0-100)/100 * -8 = 8, so rotateX should be 8deg
    expect(transform).toBe('perspective(600px) rotateX(8deg) rotateY(0deg)');
  });

  it('resets transform on mouse leave', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // First move mouse to create a tilt
    fireEvent.mouseMove(cardDiv, {clientX: 50, clientY: 50});
    expect(cardDiv.style.transform).not.toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');

    // Then leave
    fireEvent.mouseLeave(cardDiv);
    expect(cardDiv.style.transform).toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');
  });

  it('handles multiple mouse move events', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Move to one position
    fireEvent.mouseMove(cardDiv, {clientX: 50, clientY: 50});
    const firstTransform = cardDiv.style.transform;

    // Move to a different position
    fireEvent.mouseMove(cardDiv, {clientX: 150, clientY: 150});
    const secondTransform = cardDiv.style.transform;

    // Transforms should be different
    expect(firstTransform).not.toBe(secondTransform);
  });

  it('resets transform on mouse leave even after multiple moves', () => {
    render(
      <TiltCard>
        <p>Content</p>
      </TiltCard>
    );
    const cardDiv = screen.getByText('Content').parentElement!;

    jest.spyOn(cardDiv, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    fireEvent.mouseMove(cardDiv, {clientX: 10, clientY: 10});
    fireEvent.mouseMove(cardDiv, {clientX: 190, clientY: 190});
    fireEvent.mouseLeave(cardDiv);

    expect(cardDiv.style.transform).toBe('perspective(600px) rotateX(0deg) rotateY(0deg)');
  });
});
