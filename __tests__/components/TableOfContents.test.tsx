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

    expect(screen.getByText('On this page')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'First Section'})).toHaveAttribute('href', '#first-section');
    expect(screen.getByRole('link', {name: 'Sub Section'})).toHaveAttribute('href', '#sub-section');
    expect(screen.getByRole('link', {name: 'Second Section'})).toHaveAttribute('href', '#second-section');
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

  it('is open by default and can be collapsed and reopened', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Section One'},
      {tag: 'h2', text: 'Section Two'},
    ]);

    render(<TableOfContents />);

    const toggle = screen.getByText('On this page');

    // Open on arrival, links visible
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('link')).toHaveLength(2);

    // Collapse
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryAllByRole('link')).toHaveLength(0);

    // Reopen
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('stays open when a link is clicked', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Section One', id: 'section-one'},
    ]);

    render(<TableOfContents />);

    fireEvent.click(screen.getByRole('link', {name: 'Section One'}));

    expect(screen.getByText('On this page')).toHaveAttribute('aria-expanded', 'true');
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

  it('renders a single nav with the correct aria-label', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Heading'},
    ]);

    render(<TableOfContents />);

    const navs = screen.getAllByRole('navigation');
    expect(navs).toHaveLength(1);
    expect(navs[0]).toHaveAttribute('aria-label', 'Table of Contents');
  });

  it('indents h3 headings under h2 headings', () => {
    setupArticleWithHeadings([
      {tag: 'h2', text: 'Main Section', id: 'main'},
      {tag: 'h3', text: 'Sub Section', id: 'sub'},
    ]);

    render(<TableOfContents />);

    const mainItem = screen.getByRole('link', {name: 'Main Section'}).closest('li');
    const subItem = screen.getByRole('link', {name: 'Sub Section'}).closest('li');

    expect(mainItem).toHaveAttribute('data-level', '2');
    expect(mainItem).not.toHaveClass('pl-[14px]');
    expect(subItem).toHaveAttribute('data-level', '3');
    expect(subItem).toHaveClass('pl-[14px]');
  });
});
