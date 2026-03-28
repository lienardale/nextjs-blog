import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Section from '../../app/[locale]/components/Section';

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}));

// Mock i18n navigation
jest.mock('../../lib/i18n/navigation', () => ({
  Link: ({children, href, ...props}: any) => <a href={href} {...props}>{children}</a>,
}));

// Mock @heroicons/react
jest.mock('@heroicons/react/24/solid', () => ({
  ChevronDownIcon: (props: any) => <svg data-testid="chevron-down" {...props} />,
  DocumentTextIcon: (props: any) => <svg data-testid="icon-document" {...props} />,
  AcademicCapIcon: (props: any) => <svg data-testid="icon-academic" {...props} />,
  BriefcaseIcon: (props: any) => <svg data-testid="icon-briefcase" {...props} />,
  CodeBracketIcon: (props: any) => <svg data-testid="icon-code" {...props} />,
  CommandLineIcon: (props: any) => <svg data-testid="icon-terminal" {...props} />,
  UserGroupIcon: (props: any) => <svg data-testid="icon-usergroup" {...props} />,
  ChatBubbleLeftRightIcon: (props: any) => <svg data-testid="icon-chat" {...props} />,
  PuzzlePieceIcon: (props: any) => <svg data-testid="icon-puzzle" {...props} />,
  EnvelopeIcon: (props: any) => <svg data-testid="icon-envelope" {...props} />,
}));

// Mock ParallaxBackground — render as the specified tag with className
jest.mock('../../app/[locale]/components/ParallaxBackground', () => {
  return function MockParallaxBackground({children, className, as: Tag = 'div'}: any) {
    return <Tag className={className} data-testid="parallax-bg-wrapper">{children}</Tag>;
  };
});

// Mock Date component
jest.mock('../../app/[locale]/components/Date', () => {
  return function MockDate({dateString}: {dateString: string; locale: string}) {
    return <time>{dateString}</time>;
  };
});

const mockData = [
  {id: 'item-1', date: '2024-01-15', title: 'First Item'},
  {id: 'item-2', date: '2024-02-20', title: 'Second Item'},
  {id: 'item-3', date: '2024-03-10', title: 'Third Item'},
];

describe('Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the section title as a button', () => {
    render(<Section data={mockData} title="Experience" dir="experience" />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders chevron down icon', () => {
    render(<Section data={mockData} title="Experience" dir="experience" />);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('shows all items when dropdown is opened', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Experience" dir="experience" />);

    await user.click(screen.getByText('Experience'));

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('renders menu items with correct hrefs', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Experience" dir="experience" />);

    await user.click(screen.getByText('Experience'));

    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('href', '/experience/item-1');
    expect(items[1]).toHaveAttribute('href', '/experience/item-2');
    expect(items[2]).toHaveAttribute('href', '/experience/item-3');
  });

  it('renders dates for each item', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Experience" dir="experience" />);

    await user.click(screen.getByText('Experience'));

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
    expect(screen.getByText('2024-03-10')).toBeInTheDocument();
  });

  it('uses experience icon for experience dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Experience" dir="experience" />);

    await user.click(screen.getByText('Experience'));

    expect(screen.getAllByTestId('icon-briefcase').length).toBeGreaterThan(0);
  });

  it('uses education icon for education dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Education" dir="education" />);

    await user.click(screen.getByText('Education'));

    expect(screen.getAllByTestId('icon-academic').length).toBeGreaterThan(0);
  });

  it('uses code icon for skills dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Skills" dir="skills" />);

    await user.click(screen.getByText('Skills'));

    expect(screen.getAllByTestId('icon-code').length).toBeGreaterThan(0);
  });

  it('uses envelope icon for about_me dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="About Me" dir="about_me" />);

    await user.click(screen.getByText('About Me'));

    expect(screen.getAllByTestId('icon-envelope').length).toBeGreaterThan(0);
  });

  it('uses puzzle icon for hobbies dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Hobbies" dir="hobbies" />);

    await user.click(screen.getByText('Hobbies'));

    expect(screen.getAllByTestId('icon-puzzle').length).toBeGreaterThan(0);
  });

  it('uses document icon for posts dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Posts" dir="posts" />);

    await user.click(screen.getByText('Posts'));

    expect(screen.getAllByTestId('icon-document').length).toBeGreaterThan(0);
  });

  it('falls back to document icon for unknown dir', async () => {
    const user = userEvent.setup();
    render(<Section data={mockData} title="Unknown" dir="unknown" />);

    await user.click(screen.getByText('Unknown'));

    expect(screen.getAllByTestId('icon-document').length).toBeGreaterThan(0);
  });

  it('renders with empty data array', () => {
    render(<Section data={[]} title="Empty" dir="experience" />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('renders a single item', async () => {
    const user = userEvent.setup();
    const single = [{id: 'only', date: '2024-06-01', title: 'Only Item'}];
    render(<Section data={single} title="Single" dir="experience" />);

    await user.click(screen.getByText('Single'));

    expect(screen.getByText('Only Item')).toBeInTheDocument();
    expect(screen.getByRole('menuitem')).toHaveAttribute('href', '/experience/only');
  });

  it('uses ParallaxBackground instead of raw bg-fixed for mobile compatibility', () => {
    render(<Section data={mockData} title="Experience" dir="experience" />);
    // Section should delegate parallax to the ParallaxBackground component
    expect(screen.getByTestId('parallax-bg-wrapper')).toBeInTheDocument();
    // The section should NOT have bg-fixed directly (ParallaxBackground handles it)
    const wrapper = screen.getByTestId('parallax-bg-wrapper');
    expect(wrapper.className).not.toContain('bg-fixed');
  });

  it('is wrapped in React.memo', () => {
    // Section is exported as React.memo(Section)
    // React.memo components have a $$typeof symbol and a type property
    expect(Section).toHaveProperty('$$typeof');
  });
});
