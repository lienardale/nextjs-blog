import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlipCard from '../../app/[locale]/components/FlipCard';

describe('FlipCard', () => {
  it('renders front content', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    expect(screen.getByText('Front')).toBeInTheDocument();
  });

  it('renders back content', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('has perspective on container', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const container = screen.getByTestId('flip-card');
    expect(container).toHaveClass('perspective-[600px]');
  });

  it('starts unflipped', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const inner = screen.getByTestId('flip-inner');
    expect(inner).not.toHaveClass('[transform:rotateY(180deg)]');
  });

  it('flips on click', async () => {
    const user = userEvent.setup();
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const container = screen.getByTestId('flip-card');
    const inner = screen.getByTestId('flip-inner');

    await user.click(container);
    expect(inner).toHaveClass('[transform:rotateY(180deg)]');
  });

  it('unflips on second click', async () => {
    const user = userEvent.setup();
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const container = screen.getByTestId('flip-card');
    const inner = screen.getByTestId('flip-inner');

    await user.click(container);
    expect(inner).toHaveClass('[transform:rotateY(180deg)]');

    await user.click(container);
    expect(inner).not.toHaveClass('[transform:rotateY(180deg)]');
  });

  it('has backface-visibility hidden on both faces', () => {
    const {container} = render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const faces = container.querySelectorAll('[class*="backface-visibility"]');
    expect(faces).toHaveLength(2);
  });

  it('back face has rotateY(180deg)', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const backParent = screen.getByText('Back').parentElement!;
    expect(backParent).toHaveClass('[transform:rotateY(180deg)]');
  });

  it('has transition-transform on inner wrapper', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const inner = screen.getByTestId('flip-inner');
    expect(inner).toHaveClass('transition-transform', 'duration-500');
  });

  it('has aspect-square class', () => {
    render(<FlipCard front={<p>Front</p>} back={<p>Back</p>} />);
    const container = screen.getByTestId('flip-card');
    expect(container).toHaveClass('aspect-square');
  });
});
