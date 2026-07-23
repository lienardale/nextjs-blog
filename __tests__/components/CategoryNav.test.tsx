import React from 'react';
import {render, screen} from '@testing-library/react';
import CategoryNav from '../../app/[locale]/components/CategoryNav';

// Mock next/navigation
const mockUsePathname = jest.fn(() => '/');
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock i18n navigation
jest.mock('../../lib/i18n/navigation', () => ({
  Link: ({children, href, ...props}: any) => <a href={href} {...props}>{children}</a>,
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({replace: jest.fn()})),
}));

const mockItems = [
  {id: 'react', label: 'React'},
  {id: 'typescript', label: 'TypeScript'},
  {id: 'nodejs', label: 'Node.js'},
];

describe('CategoryNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  it('renders all nav items', () => {
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders items as links with correct href', () => {
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/skills/react');
    expect(links[1]).toHaveAttribute('href', '/skills/typescript');
    expect(links[2]).toHaveAttribute('href', '/skills/nodejs');
  });

  it('applies bg-accent class to active item', () => {
    mockUsePathname.mockReturnValue('/skills/react');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const reactLink = screen.getByText('React');
    expect(reactLink).toHaveClass('bg-accent');
    expect(reactLink).toHaveClass('text-accent-fg');
  });

  it('applies bg-bg-alt class to inactive items', () => {
    mockUsePathname.mockReturnValue('/skills/react');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const tsLink = screen.getByText('TypeScript');
    const nodeLink = screen.getByText('Node.js');

    expect(tsLink).toHaveClass('bg-bg-alt');
    expect(nodeLink).toHaveClass('bg-bg-alt');
  });

  it('inactive items do not have bg-accent', () => {
    mockUsePathname.mockReturnValue('/skills/react');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const tsLink = screen.getByText('TypeScript');
    expect(tsLink).not.toHaveClass('bg-accent');
  });

  it('active item does not have bg-bg-alt', () => {
    mockUsePathname.mockReturnValue('/skills/react');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const reactLink = screen.getByText('React');
    expect(reactLink).not.toHaveClass('bg-bg-alt');
  });

  it('matches active item based on pathname ending', () => {
    // Pathname ends with /typescript
    mockUsePathname.mockReturnValue('/en/skills/typescript');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const tsLink = screen.getByText('TypeScript');
    expect(tsLink).toHaveClass('bg-accent');

    const reactLink = screen.getByText('React');
    expect(reactLink).toHaveClass('bg-bg-alt');
  });

  it('no items are active when pathname does not match any item', () => {
    mockUsePathname.mockReturnValue('/skills');
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('bg-bg-alt');
      expect(link).not.toHaveClass('bg-accent');
    });
  });

  it('renders a nav element', () => {
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('nav has correct flex and gap classes', () => {
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'flex-wrap', 'gap-2', 'mb-6');
  });

  it('links have rounded-full and text-sm classes', () => {
    render(<CategoryNav items={mockItems} baseDir="skills" />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('rounded-full', 'text-sm', 'px-3', 'py-1.5');
    });
  });

  it('renders with different baseDir', () => {
    render(<CategoryNav items={mockItems} baseDir="experience" />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/experience/react');
    expect(links[1]).toHaveAttribute('href', '/experience/typescript');
    expect(links[2]).toHaveAttribute('href', '/experience/nodejs');
  });

  it('handles empty items array', () => {
    render(<CategoryNav items={[]} baseDir="skills" />);

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('handles single item', () => {
    mockUsePathname.mockReturnValue('/skills/only');
    render(<CategoryNav items={[{id: 'only', label: 'Only Item'}]} baseDir="skills" />);

    const link = screen.getByText('Only Item');
    expect(link).toHaveClass('bg-accent');
  });
});
