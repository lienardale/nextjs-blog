import React from 'react';
import {render, screen} from '@testing-library/react';
import PageTransition from '../../app/[locale]/components/PageTransition';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({replace: jest.fn(), push: jest.fn()})),
}));

const {usePathname} = require('next/navigation') as {usePathname: jest.Mock};

function setPathname(pathname: string) {
  usePathname.mockReturnValue(pathname);
}

describe('PageTransition component', () => {
  beforeEach(() => {
    setPathname('/');
  });

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

  it('wraps children in a div so the page root is its direct child', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper?.tagName).toBe('DIV');
  });

  it('does not fade on first load', () => {
    render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    expect(screen.getByText('Content').parentElement).not.toHaveClass('route-fade');
  });

  it('does not fade when re-rendered on the same pathname', () => {
    const {rerender} = render(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    rerender(
      <PageTransition>
        <p>Content</p>
      </PageTransition>
    );
    expect(screen.getByText('Content').parentElement).not.toHaveClass('route-fade');
  });

  it('enables the fade on the first navigation', () => {
    const {rerender} = render(
      <PageTransition>
        <p>Home</p>
      </PageTransition>
    );

    setPathname('/posts');
    rerender(
      <PageTransition>
        <p>Posts</p>
      </PageTransition>
    );

    expect(screen.getByText('Posts').parentElement).toHaveClass('route-fade');
  });

  it('keeps the fade enabled for later navigations, including back to the first page', () => {
    const {rerender} = render(
      <PageTransition>
        <p>Home</p>
      </PageTransition>
    );

    setPathname('/posts');
    rerender(
      <PageTransition>
        <p>Posts</p>
      </PageTransition>
    );

    setPathname('/');
    rerender(
      <PageTransition>
        <p>Home again</p>
      </PageTransition>
    );

    expect(screen.getByText('Home again').parentElement).toHaveClass('route-fade');
  });

  it('starts unarmed again after a remount (locale switch)', () => {
    setPathname('/posts');
    const {unmount} = render(
      <PageTransition>
        <p>Posts</p>
      </PageTransition>
    );
    unmount();

    setPathname('/fr/posts');
    render(
      <PageTransition>
        <p>Articles</p>
      </PageTransition>
    );

    expect(screen.getByText('Articles').parentElement).not.toHaveClass('route-fade');
  });
});
