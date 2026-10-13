/**
 * Page rendering smoke tests.
 *
 * These verify that every page component can render without crashing and
 * produces the expected content. They catch blank-page regressions caused by
 * broken translations, missing data, or incompatible imports — WITHOUT
 * needing a running dev server.
 */
import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';

// ---------------------------------------------------------------------------
// Shared mocks for server / i18n / Next.js primitives
// ---------------------------------------------------------------------------

const enMessages = require('../../locales/en/common.json');

// Resolve nested keys like "home.title" against the locale messages object.
function resolveKey(key: string): string {
  const parts = key.split('.');
  let cursor: unknown = enMessages;
  for (const part of parts) {
    if (cursor && typeof cursor === 'object' && part in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof cursor === 'string' ? cursor : key;
}

// Fills simple {name} arguments. Plural/select messages are left as written,
// which is enough for a smoke test.
function format(message: string, values?: Record<string, unknown>): string {
  if (!values) return message;
  return message.replace(/\{(\w+)\}/g, (match, name) => (name in values ? String(values[name]) : match));
}

function makeT(namespace?: string) {
  const path = (key: string) => (namespace ? `${namespace}.${key}` : key);
  const t = (key: string, values?: Record<string, unknown>) => format(resolveKey(path(key)), values);
  return Object.assign(t, {
    raw: (key: string) => resolveKey(path(key)),
    rich: (key: string) => resolveKey(path(key)),
  });
}

// next-intl server (used by async page components)
jest.mock('next-intl/server', () => ({
  getTranslations: () => Promise.resolve(makeT()),
  getMessages: () => Promise.resolve(enMessages),
}));

// next-intl client (used by 'use client' components)
jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({children}: {children: React.ReactNode}) => <>{children}</>,
  useTranslations: (namespace?: string) => makeT(namespace),
  useLocale: () => 'en',
  hasLocale: (_locales: string[], locale: string) =>
    ['en', 'fr', 'de', 'es'].includes(locale),
}));

// Next.js navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  redirect: jest.fn(),
  usePathname: () => '/',
  useRouter: () => ({push: jest.fn(), replace: jest.fn(), back: jest.fn()}),
  useSearchParams: () => new URLSearchParams(),
}));

// Next.js primitives
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const {priority, fill, ...rest} = props;
    return <img {...rest} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({children, ...props}: {children: React.ReactNode; href: string}) => (
    <a {...props}>{children}</a>
  ),
}));

jest.mock('next/script', () => ({__esModule: true, default: () => null}));

// i18n navigation (Link component used by pages)
jest.mock('../../lib/i18n/navigation', () => ({
  Link: ({children, ...props}: {children: React.ReactNode; href: string}) => (
    <a {...props}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({push: jest.fn(), replace: jest.fn()}),
  redirect: jest.fn(),
}));

// IntersectionObserver (used by SkillBar, RadarChart, DurationBars)
beforeAll(() => {
  (global as any).IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
const params = Promise.resolve({locale: 'en'});

// ---------------------------------------------------------------------------
// Tests — one per page component
// ---------------------------------------------------------------------------

describe('Home page', () => {
  it('renders the intro, the index, selected work and the now rows', async () => {
    const Page = (await import('../../app/[locale]/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Alexandre Lienard');
    expect(screen.getByAltText('Alexandre Lienard')).toHaveAttribute('src', '/images/profile.jpg');

    // Index: six rows with plain-text meta
    const index = screen.getByRole('navigation');
    const rows = within(index).getAllByRole('link');
    expect(rows.map((r) => r.getAttribute('href'))).toEqual([
      '/experience',
      '/education',
      '/skills',
      '/contact',
      '/about_me',
      '/posts',
    ]);
    expect(rows[0]).toHaveTextContent('05 roles · marketing → eng');
    // The posts count is filled in at render time
    expect(rows[5]).toHaveTextContent(/^06Posts\d{2} posts on engineering$/);

    // Selected work links out to the full list
    expect(screen.getByRole('link', {name: 'All projects →'})).toHaveAttribute('href', '/skills/projects');
    expect(screen.getByText('ft_transcendence')).toBeInTheDocument();

    // Now
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Twenty Years After by Dumas')).toBeInTheDocument();

    // The editorial headline and its markup are gone
    expect(container.textContent).not.toMatch(/Welcome/);
    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });
});

describe('Experience overview page', () => {
  it('renders the heading, the meta grid and all role rows', async () => {
    const Page = (await import('../../app/[locale]/experience/page')).default;
    const {container} = render(await Page({params}));

    // The page title is the plain section name
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Experience');

    // Meta grid
    expect(screen.getByText('Latest')).toBeInTheDocument();
    expect(screen.getByText('Track')).toBeInTheDocument();
    expect(screen.getByText('Paris · Marseille')).toBeInTheDocument();

    // 5 rows linking to the per-company detail pages
    const rows = container.querySelectorAll('a.row');
    expect(rows.length).toBe(5);
    const hrefs = Array.from(rows).map((r) => r.getAttribute('href'));
    expect(hrefs).toEqual([
      '/experience/Wiremind',
      '/experience/Junior-42-Paris',
      '/experience/ESF-Sciences-Humaines',
      '/experience/Editions-Denoel',
      '/experience/Flammarion',
    ]);

    // Role, company name (from the registry) and line are plain text
    expect(rows[0]).toHaveTextContent('Senior Fullstack Engineer · Wiremind');
    expect(rows[0]).toHaveTextContent('Cayzn — RMS for the passenger industry');
    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });
});

describe('Education overview page', () => {
  it('renders the heading and all school rows', async () => {
    const Page = (await import('../../app/[locale]/education/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Education');

    // 3 rows linking to per-school detail pages
    const rows = container.querySelectorAll('a.row');
    expect(rows.length).toBe(3);
    const hrefs = Array.from(rows).map((r) => r.getAttribute('href'));
    expect(hrefs).toEqual(['/education/42-Paris', '/education/IAE-Lille', '/education/CPGE_BL']);

    expect(rows[0]).toHaveTextContent('Software engineering · 42 Paris');
    expect(rows[2]).toHaveTextContent('CPGE BL · Notre Dame de la Paix');
    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });
});

describe('Skills overview page', () => {
  it('renders the hard skills, project rows and soft skills', async () => {
    const Page = (await import('../../app/[locale]/skills/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Skills');
    expect(screen.getByRole('link', {name: 'Overview'})).toHaveAttribute('aria-current', 'page');

    // Radar + 8 linked rows
    expect(screen.getByText('Hard skills')).toBeInTheDocument();
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
    expect(within(screen.getByTestId('skill-bar')).getAllByRole('listitem')).toHaveLength(8);

    // Every project in the registry, with its GitHub link
    expect(screen.getAllByRole('link', {name: 'GitHub ↗'})).toHaveLength(7);
    expect(screen.getByText('ft_transcendence')).toBeInTheDocument();

    // Soft skills as plain rows (no flip cards, no markup in the names)
    expect(screen.getByText('Stakeholder management')).toBeInTheDocument();
    expect(screen.getByText('Crisis management')).toBeInTheDocument();
    expect(container.querySelector('.flip')).toBeNull();
    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });
});

describe('Skills — Stack page', () => {
  it('renders radar chart and skill bars', async () => {
    const Page = (await import('../../app/[locale]/skills/stack/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'Stack'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Proficiency')).toBeInTheDocument();
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
    expect(within(screen.getByTestId('skill-bar')).getAllByRole('listitem')).toHaveLength(9);
  });
});

describe('Skills — Projects page', () => {
  it('renders project cards with names', async () => {
    const Page = (await import('../../app/[locale]/skills/projects/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'Projects'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Multiplayer Online Pong')).toBeInTheDocument();
    expect(screen.getByText('Web Server')).toBeInTheDocument();
    expect(screen.getByText('Ray Tracer')).toBeInTheDocument();
    expect(screen.getByText('Shell')).toBeInTheDocument();

    // Filter pills, sort toggle and count
    expect(screen.getByRole('button', {name: 'All'})).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', {name: 'Newest first ↓'})).toBeInTheDocument();
  });
});

describe('Skills — Soft Skills page', () => {
  it('renders the four soft skills as plain cells', async () => {
    const Page = (await import('../../app/[locale]/skills/soft-skills/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'Soft skills'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Stakeholder Management')).toBeInTheDocument();
    expect(screen.getByText('Adaptability')).toBeInTheDocument();
    expect(screen.getByText('Project Management')).toBeInTheDocument();
    expect(screen.getByText('Crisis Management')).toBeInTheDocument();
    expect(screen.queryByTestId('flip-card')).not.toBeInTheDocument();
  });
});

describe('About Me overview page', () => {
  it('renders the facts, the trip log, bikes and the shelf', async () => {
    const Page = (await import('../../app/[locale]/about_me/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent("Hi, I'm Alexandre.");
    expect(screen.getByRole('link', {name: 'About'})).toHaveAttribute('aria-current', 'page');

    // Facts
    expect(screen.getByText('Based in')).toBeInTheDocument();
    expect(screen.getByText('Marseille')).toBeInTheDocument();

    // 13 trips, all collapsed, and a label whose totals are summed from them
    const toggles = screen.getAllByRole('button', {expanded: false});
    expect(toggles).toHaveLength(13);
    expect(screen.getByText('Bike trips · 13 trips · 3,000 km · 34 days')).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();

    // 2 bikes + 6 covers linking to the full shelf
    expect(screen.getByAltText('Motobecane single-speed')).toBeInTheDocument();
    expect(screen.getByAltText('Kona Rove Al gravel')).toBeInTheDocument();
    expect(container.querySelectorAll('a[href="/hobbies/graphic-novels"]')).toHaveLength(7);

    // The sticker scrapbook and its copy are gone
    expect(container.textContent).not.toMatch(/sticker/i);
    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });

  it('opens one trip at a time', async () => {
    const Page = (await import('../../app/[locale]/about_me/page')).default;
    const {container} = render(await Page({params}));
    const toggles = screen.getAllByRole('button', {expanded: false});

    fireEvent.click(toggles[0]);
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelectorAll('iframe')).toHaveLength(1);

    fireEvent.click(toggles[3]);
    expect(toggles[0]).toHaveAttribute('aria-expanded', 'false');
    expect(toggles[3]).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelectorAll('iframe')).toHaveLength(1);

    // The pre-Komoot trips show a route sketch, not an embed
    fireEvent.click(toggles[12]);
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByRole('img', {name: 'Lille → Amsterdam → Lille'})).toBeInTheDocument();
  });
});

describe('About Me — Infos page', () => {
  it('renders the contact rows and the form with all fields', async () => {
    const Page = (await import('../../app/[locale]/about_me/infos/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'Infos'})).toHaveAttribute('aria-current', 'page');

    // Email / CV / LinkedIn rows
    expect(screen.getByRole('link', {name: /alienard\.dev@gmail\.com/})).toHaveAttribute(
      'href',
      'mailto:alienard.dev@gmail.com',
    );
    expect(screen.getByRole('link', {name: /linkedin\.com\/in\/alienard/})).toBeInTheDocument();

    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Send message'})).toBeInTheDocument();
  });
});

describe('About Me — Languages page', () => {
  it('renders world map with language legend', async () => {
    const Page = (await import('../../app/[locale]/about_me/languages/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'Languages'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('world-map')).toBeInTheDocument();
    // Legend should show both languages
    const legend = screen.getAllByTestId('map-legend-row');
    expect(legend[0]).toHaveTextContent('French — native');
    expect(legend[1]).toHaveTextContent('English — fluent');
  });
});

// Mock CVPreview (async server component that can't resolve hooks in tests)
jest.mock('../../app/[locale]/components/CVPreview', () => ({
  __esModule: true,
  default: ({url}: {url: string; locale: string}) => (
    <div data-testid="cv-preview">
      <iframe src={url} title="CV" data-testid="cv-iframe" />
      <a href={url} target="_blank" rel="noopener noreferrer" data-testid="cv-open-button">
        Open in new tab
      </a>
    </div>
  ),
}));

// ---------------------------------------------------------------------------
// Hobbies pages
// ---------------------------------------------------------------------------

describe('Hobbies — Graphic Novels page', () => {
  it('renders heading, shelf, and no hardcoded date', async () => {
    const Page = (await import('../../app/[locale]/hobbies/graphic-novels/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Graphic Novels');
    // Breadcrumb back to the Hobbies section
    expect(screen.getByRole('link', {name: 'Hobbies'})).toHaveAttribute('href', '/about_me');

    expect(screen.getByText('On the shelf · 29')).toBeInTheDocument();
    expect(screen.getByText('Maus')).toBeInTheDocument();
    expect(screen.getByText('Persepolis')).toBeInTheDocument();
    expect(screen.getByText('Akira')).toBeInTheDocument();
    expect(screen.getAllByTestId('graphic-novel-card')).toHaveLength(29);
    // Ensure old hardcoded date is gone
    expect(screen.queryByText('2022-05-12')).not.toBeInTheDocument();
    // No stock-palette genre pill
    expect(container.innerHTML).not.toMatch(/purple-/);
  });
});

describe('About Me — CV page', () => {
  it('renders CV iframe and open button', async () => {
    const Page = (await import('../../app/[locale]/about_me/cv/page')).default;
    render(await Page({params}));

    expect(screen.getByRole('link', {name: 'CV'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByTestId('cv-iframe')).toBeInTheDocument();
    expect(screen.getByTestId('cv-open-button')).toBeInTheDocument();
    expect(screen.getByText('Open in new tab')).toBeInTheDocument();
  });
});


// ---------------------------------------------------------------------------
// Posts, Contact, Not found
// ---------------------------------------------------------------------------

describe('Posts page', () => {
  it('lists posts with registry titles, descriptions and reading times', async () => {
    const Page = (await import('../../app/[locale]/posts/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Posts');

    const row = container.querySelector('a[href="/posts/next-intl-guide"]')!;
    expect(row).toHaveTextContent('Internationalization with next-intl');
    expect(row).toHaveTextContent('How to add multi-language support');
    expect(row).toHaveTextContent('i18n');
    // Same number the post page shows (registry is the single source)
    expect(row).toHaveTextContent('5 min read');
    expect(container.querySelector('a[href="/posts/typescript-react-patterns"]')).toHaveTextContent('4 min read');

    expect(container.textContent).not.toMatch(/<\/?(em|b|br)\b/);
  });

  it('filters by topic and shows the empty state when nothing matches', async () => {
    const Page = (await import('../../app/[locale]/posts/page')).default;
    const {container} = render(await Page({params}));
    const total = container.querySelectorAll('a.row').length;

    fireEvent.click(screen.getByRole('button', {name: 'React'}));
    const filtered = container.querySelectorAll('a.row').length;
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(total);
    expect(screen.getByRole('button', {name: 'React'})).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', {name: 'All'}));
    expect(container.querySelectorAll('a.row').length).toBe(total);
  });
});

describe('Contact page', () => {
  it('renders the five channels and the link to the form', async () => {
    const Page = (await import('../../app/[locale]/contact/page')).default;
    const {container} = render(await Page({params}));

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Contact');

    const hrefs = Array.from(container.querySelectorAll('a.row')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'mailto:alienard.dev@gmail.com',
      'https://www.linkedin.com/in/alienard/',
      'https://github.com/lienardale',
      'https://lienardale.github.io/markdown-cv/',
      'https://www.komoot.com/user/1617431265877',
    ]);
    expect(screen.getByRole('link', {name: 'Get in touch →'})).toHaveAttribute('href', '/about_me/infos');
  });
});

describe('Not found page', () => {
  it('renders the title, the message and a way back', async () => {
    const Page = (await import('../../app/[locale]/not-found')).default;
    render(await Page());

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Page not found');
    expect(screen.getByText("The page you're looking for doesn't exist.")).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '← Index'})).toHaveAttribute('href', '/');
  });
});
