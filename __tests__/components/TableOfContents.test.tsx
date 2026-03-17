import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import TableOfContents from '../../app/[locale]/components/TableOfContents';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      toc: 'Table of Contents',
      toc_toggle: 'On this page',
    };
    return map[key] || key;
  },
}));

// Mock IntersectionObserver
const observeMock = jest.fn();
const disconnectMock = jest.fn();

beforeEach(() => {
  observeMock.mockClear();
  disconnectMock.mockClear();
  (global as any).IntersectionObserver = jest.fn((callback) => ({
    observe: observeMock,
    unobserve: jest.fn(),
    disconnect: disconnectMock,
    callback,
  }));
});

function setupArticleWithHeadings(headings: {tag: string; text: string; id?: string}[]) {
  const article = document.createElement('article');
  headings.forEach(({tag, text, id}) => {
    const el = document.createElement(tag);
    el.textContent = text;
    if (id) el.id = id;
    article.appendChild(el);
  });
  document.body.appendChild(article);
  return article;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('TableOfContents', () => {
  it('renders nothing when no article exists', () => {
    const {container} = render(<TableOfContents />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when article has no headings', () => {
    const article = document.createElement('article');
    article.innerHTML = '<p>Just a paragraph</p>';
    document.body.appendChild(article);

    const {container} = render(<TableOfContents />);
    expect(container.innerHTML).toBe('');
  });

  it('renders heading links when article has h2/h3 elements', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'First Section'},
      {tag: 'h3', text: 'Sub Section'},
      {tag: 'h2', text: 'Second Section'},
    ]);

    render(<TableOfContents />);

    // Mobile toggle should be present
    expect(screen.getByText('On this page')).toBeInTheDocument();
  });

  it('assigns slugified ids to headings without ids', () => {
    const article = setupArticleWithHeadings([
      {tag: 'h2', text: 'My Section Title'},
    ]);

    render(<TableOfContents />);

    const heading = article.querySelector('h2');
    expect(heading?.id).toBe('my-section-title');
  });

  it('preserves existing heading ids', () => {
    const article = setupArticleWithHeadings([
      {tag: 'h2', text: 'Some Title', id: 'custom-id'},
    ]);

    render(<TableOfContents />);

    const heading = article.querySelector('h2');
    expect(heading?.id).toBe('custom-id');
  });

  it('toggles mobile panel open and closed', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Section One'},
      {tag: 'h2', text: 'Section Two'},
    ]);

    render(<TableOfContents />);

    const toggle = screen.getByText('On this page');

    // Initially closed - no nav in mobile panel
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Open
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Links should be visible
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // Close
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile panel when a link is clicked', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Section One', id: 'section-one'},
    ]);

    render(<TableOfContents />);

    // Open panel
    fireEvent.click(screen.getByText('On this page'));
    expect(screen.getByText('On this page')).toHaveAttribute('aria-expanded', 'true');

    // Find the mobile nav (inside xl:hidden div) and click the link in it
    const allLinks = screen.getAllByText('Section One');
    // The mobile link is the second one (desktop nav is first but hidden via CSS)
    const mobileLink = allLinks.filter((el) => el.tagName === 'A')[1];
    if (mobileLink) {
      fireEvent.click(mobileLink);
    }

    expect(screen.getByText('On this page')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets up IntersectionObserver on headings', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Heading A'},
      {tag: 'h3', text: 'Heading B'},
    ]);

    render(<TableOfContents />);

    // Should have observed 2 headings
    expect(observeMock).toHaveBeenCalledTimes(2);
  });

  it('disconnects IntersectionObserver on unmount', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Heading'},
    ]);

    const {unmount} = render(<TableOfContents />);
    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('renders desktop nav with correct aria-label', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Heading'},
    ]);

    render(<TableOfContents />);

    const navs = screen.getAllByRole('navigation');
    expect(navs.some((nav) => nav.getAttribute('aria-label') === 'Table of Contents')).toBe(true);
  });

  it('indents h3 headings more than h2 headings', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Main Section', id: 'main'},
      {tag: 'h3', text: 'Sub Section', id: 'sub'},
    ]);

    render(<TableOfContents />);

    // Open mobile panel to see links
    fireEvent.click(screen.getByText('On this page'));

    const mainLinks = screen.getAllByText('Main Section');
    const subLinks = screen.getAllByText('Sub Section');

    // Find link elements
    const mainLink = mainLinks.find((el) => el.tagName === 'A');
    const subLink = subLinks.find((el) => el.tagName === 'A');

    expect(mainLink).toHaveClass('pl-3');
    expect(subLink).toHaveClass('pl-6');
  });
});
