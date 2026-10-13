import sitemap from '../../app/sitemap';
import {draftPostIds, getSortedItems} from '../../lib/registry';

// next-intl's routing helper is ESM-only; the sitemap only needs the locales.
jest.mock('../../lib/i18n/routing', () => ({
  routing: {locales: ['en', 'fr', 'de', 'es']},
}));

const BASE = 'https://alienard.vercel.app';
const LOCALES = ['en', 'fr', 'de', 'es'];

describe('sitemap', () => {
  const urls = new Set(sitemap().map((entry) => entry.url));

  it.each(LOCALES)('lists the home page for %s', (locale) => {
    expect(urls.has(`${BASE}/${locale}`)).toBe(true);
  });

  it.each(['experience', 'education', 'skills', 'about_me', 'hobbies', 'posts', 'contact'])(
    'lists the %s overview in every locale',
    (section) => {
      for (const locale of LOCALES) {
        expect(urls.has(`${BASE}/${locale}/${section}`)).toBe(true);
      }
    },
  );

  it.each(['experience', 'education'])('lists every %s detail page in the registry', (category) => {
    const ids = getSortedItems(category, 'en').map((item) => item.id);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      expect(urls.has(`${BASE}/en/${category}/${id}`)).toBe(true);
    }
  });

  it('lists the current role, which was missing before', () => {
    expect(urls.has(`${BASE}/en/experience/Wiremind`)).toBe(true);
  });

  it('never lists a draft post', () => {
    expect(draftPostIds.length).toBeGreaterThan(0);
    for (const id of draftPostIds) {
      for (const locale of LOCALES) {
        expect(urls.has(`${BASE}/${locale}/posts/${id}`)).toBe(false);
      }
    }
  });

  it('has no duplicate URLs', () => {
    expect(urls.size).toBe(sitemap().length);
  });
});
