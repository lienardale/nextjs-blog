import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from '../../app/[locale]/components/Header';

// Mock next/image — filter out non-standard HTML attributes to avoid React warnings
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({priority, ...props}: any) => <img data-priority={priority ? 'true' : undefined} {...props} />,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({children, href, ...props}: any) => <a href={href} {...props}>{children}</a>,
}));

// Mock child components
jest.mock('../../app/[locale]/components/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher">LanguageSwitcher</div>,
}));

jest.mock('../../app/[locale]/components/ThemeToggle', () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

jest.mock('../../app/[locale]/components/TiltCard', () => ({
  __esModule: true,
  default: ({children}: {children: React.ReactNode}) => <div data-testid="tilt-card">{children}</div>,
}));

describe('Header', () => {
  describe('home mode (home=true)', () => {
    it('renders h1 with the name', () => {
      render(<Header home />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Alexandre Lienard');
    });

    it('does not render h2', () => {
      render(<Header home />);

      const h2 = screen.queryByRole('heading', {level: 2});
      expect(h2).not.toBeInTheDocument();
    });

    it('renders a large profile image (144x144)', () => {
      render(<Header home />);

      const img = screen.getByAltText('Alexandre Lienard');
      expect(img).toHaveAttribute('width', '144');
      expect(img).toHaveAttribute('height', '144');
    });

    it('renders profile image with correct src', () => {
      render(<Header home />);

      const img = screen.getByAltText('Alexandre Lienard');
      expect(img).toHaveAttribute('src', '/images/profile.jpg');
    });

    it('wraps content in TiltCard', () => {
      render(<Header home />);

      expect(screen.getByTestId('tilt-card')).toBeInTheDocument();
    });

    it('profile image has rounded-full class', () => {
      render(<Header home />);

      const img = screen.getByAltText('Alexandre Lienard');
      expect(img).toHaveClass('rounded-full');
    });

    it('image has priority attribute', () => {
      render(<Header home />);

      const img = screen.getByAltText('Alexandre Lienard');
      expect(img).toHaveAttribute('data-priority', 'true');
    });

    it('does not render links around the image or name in home mode', () => {
      render(<Header home />);

      // In home mode, there should be no link wrapping the image
      const links = screen.queryAllByRole('link');
      // The only links might be from other components, but not around image/name
      const imageLink = links.find(
        (link) => link.querySelector('img[alt="Alexandre Lienard"]')
      );
      expect(imageLink).toBeUndefined();
    });
  });

  describe('non-home mode (home=false or undefined)', () => {
    it('renders h2 with the name', () => {
      render(<Header />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Alexandre Lienard');
    });

    it('does not render h1', () => {
      render(<Header />);

      const h1 = screen.queryByRole('heading', {level: 1});
      expect(h1).not.toBeInTheDocument();
    });

    it('renders a smaller profile image (108x108)', () => {
      render(<Header />);

      const img = screen.getByAltText('Alexandre Lienard');
      expect(img).toHaveAttribute('width', '108');
      expect(img).toHaveAttribute('height', '108');
    });

    it('wraps image in a link to home', () => {
      render(<Header />);

      const links = screen.getAllByRole('link');
      const imageLink = links.find(
        (link) => link.querySelector('img[alt="Alexandre Lienard"]')
      );
      expect(imageLink).toBeDefined();
      expect(imageLink).toHaveAttribute('href', '/');
    });

    it('wraps name in a link to home', () => {
      render(<Header />);

      const heading = screen.getByRole('heading', {level: 2});
      const link = heading.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
      expect(link).toHaveTextContent('Alexandre Lienard');
    });

    it('does not render TiltCard', () => {
      render(<Header />);

      expect(screen.queryByTestId('tilt-card')).not.toBeInTheDocument();
    });

    it('renders correctly with home=false', () => {
      render(<Header home={false} />);

      expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
    });
  });

  describe('common elements', () => {
    it('always renders ThemeToggle', () => {
      const {rerender} = render(<Header home />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();

      rerender(<Header />);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('always renders LanguageSwitcher', () => {
      const {rerender} = render(<Header home />);
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();

      rerender(<Header />);
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    });

    it('renders a header element', () => {
      render(<Header home />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('header has flex and items-center classes', () => {
      const {container} = render(<Header home />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('flex', 'flex-col', 'items-center');
    });

    it('toolbar area has ml-auto class', () => {
      const {container} = render(<Header home />);

      const toolbar = container.querySelector('.ml-auto');
      expect(toolbar).toBeInTheDocument();
      expect(toolbar).toHaveClass('flex', 'items-center', 'gap-2');
    });
  });
});
