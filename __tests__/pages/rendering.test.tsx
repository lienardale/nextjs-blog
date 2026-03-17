/**
 * Page rendering smoke tests.
 *
 * These verify that every page component can render without crashing and
 * produces the expected content. They catch blank-page regressions caused by
 * broken translations, missing data, or incompatible imports — WITHOUT
 * needing a running dev server.
 */
import React from 'react';
import {render, screen} from '@testing-library/react';

// ---------------------------------------------------------------------------
// Shared mocks for server / i18n / Next.js primitives
// ---------------------------------------------------------------------------

const enMessages = require('../../locales/en/common.json');

// next-intl server (used by async page components)
jest.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve(
      Object.assign(
        (key: string) => enMessages[key] ?? key,
        {rich: (key: string) => enMessages[key] ?? key},
      ),
    ),
  getMessages: () => Promise.resolve(enMessages),
}));

// next-intl client (used by 'use client' components)
jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({children}: {children: React.ReactNode}) => <>{children}</>,
  useTranslations: () => (key: string) => enMessages[key] ?? key,
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

describe('Experience overview page', () => {
  it('renders heading and all timeline entries', async () => {
    const Page = (await import('../../app/[locale]/experience/page')).default;
    render(await Page({params}));

    // h1 and h2 both show "Experience" — use getAllByText
    expect(screen.getAllByText('Experience').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Junior 42 Paris').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ESF Sciences Humaines').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Editions Denoël').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Flammarion').length).toBeGreaterThanOrEqual(1);
  });
});

describe('Education overview page', () => {
  it('renders heading and all timeline entries', async () => {
    const Page = (await import('../../app/[locale]/education/page')).default;
    render(await Page({params}));

    // h1 and h2 both show "Education" — use getAllByText
    expect(screen.getAllByText('Education').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('42 Paris').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('IAE Lille').length).toBeGreaterThanOrEqual(1);
  });
});

describe('Skills — Stack page', () => {
  it('renders radar chart and skill bars', async () => {
    const Page = (await import('../../app/[locale]/skills/stack/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('skill-bar')).toBeInTheDocument();
  });
});

describe('Skills — Projects page', () => {
  it('renders project cards with names', async () => {
    const Page = (await import('../../app/[locale]/skills/projects/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Multiplayer Online Pong')).toBeInTheDocument();
    expect(screen.getByText('Web Server')).toBeInTheDocument();
    expect(screen.getByText('Ray Tracer')).toBeInTheDocument();
    expect(screen.getByText('Shell')).toBeInTheDocument();
  });
});

describe('Skills — Soft Skills page', () => {
  it('renders flip cards with skill names', async () => {
    const Page = (await import('../../app/[locale]/skills/soft-skills/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
    expect(screen.getByText('Stakeholder Management')).toBeInTheDocument();
    expect(screen.getByText('Adaptability')).toBeInTheDocument();
    expect(screen.getByText('Project Management')).toBeInTheDocument();
    expect(screen.getByText('Crisis Management')).toBeInTheDocument();
  });
});

describe('About Me — Infos page', () => {
  it('renders contact form with all fields', async () => {
    const Page = (await import('../../app/[locale]/about_me/infos/page')).default;
    render(await Page({params}));

    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Send message')).toBeInTheDocument();
  });
});

describe('About Me — Languages page', () => {
  it('renders world map with language legend', async () => {
    const Page = (await import('../../app/[locale]/about_me/languages/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByTestId('world-map')).toBeInTheDocument();
    // Legend should show both languages
    expect(screen.getByText(/French/)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
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

describe('Hobbies — Biking page', () => {
  it('renders heading, trip summary, and trip cards', async () => {
    const Page = (await import('../../app/[locale]/hobbies/biking/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Biking')).toBeInTheDocument();
    expect(screen.getByTestId('trip-summary')).toBeInTheDocument();
    // Check at least a couple of trips render
    expect(screen.getByText('Nantes → Bordeaux')).toBeInTheDocument();
    expect(screen.getByText('Lille → Amsterdam → Lille')).toBeInTheDocument();
    expect(screen.getAllByTestId('trip-card').length).toBeGreaterThanOrEqual(9);
  });
});

describe('Hobbies — Graphic Novels page', () => {
  it('renders heading, favorites, and no hardcoded date', async () => {
    const Page = (await import('../../app/[locale]/hobbies/graphic-novels/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Graphic Novels')).toBeInTheDocument();
    expect(screen.getByText('My favorites')).toBeInTheDocument();
    expect(screen.getByText('Blacksad')).toBeInTheDocument();
    expect(screen.getByText('Maus')).toBeInTheDocument();
    expect(screen.getAllByTestId('graphic-novel-card').length).toBe(6);
    // Ensure old hardcoded date is gone
    expect(screen.queryByText('2022-05-12')).not.toBeInTheDocument();
  });
});

describe('Hobbies — Podcasts page', () => {
  it('renders heading, podcast cards with status badges', async () => {
    const Page = (await import('../../app/[locale]/hobbies/podcasts/page')).default;
    render(await Page({params}));

    expect(screen.getByText('Podcasts')).toBeInTheDocument();
    expect(screen.getByText('Studio 404')).toBeInTheDocument();
    expect(screen.getByText('Floodcast')).toBeInTheDocument();
    expect(screen.getByText('Un podcast à soi')).toBeInTheDocument();
    expect(screen.getAllByTestId('podcast-card').length).toBe(3);
    // Status badges
    expect(screen.getByText('Ended')).toBeInTheDocument();
    expect(screen.getAllByText('Active').length).toBe(2);
  });
});

describe('About Me — CV page', () => {
  it('renders CV iframe and open button', async () => {
    const Page = (await import('../../app/[locale]/about_me/cv/page')).default;
    render(await Page({params}));

    expect(screen.getByText('CV')).toBeInTheDocument();
    expect(screen.getByTestId('cv-iframe')).toBeInTheDocument();
    expect(screen.getByTestId('cv-open-button')).toBeInTheDocument();
    expect(screen.getByText('Open in new tab')).toBeInTheDocument();
  });
});
