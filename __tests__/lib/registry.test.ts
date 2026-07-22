import {getNavItems, getSortedItems, getRelatedPosts} from '../../lib/registry';

describe('registry', () => {
  // ---------- getNavItems ----------
  describe('getNavItems', () => {
    const ALL_CATEGORIES = ['experience', 'education', 'skills', 'about_me', 'hobbies', 'posts'];

    it.each(ALL_CATEGORIES)('returns a non-empty array for category "%s"', (category) => {
      const items = getNavItems(category, 'en');
      expect(items.length).toBeGreaterThan(0);
    });

    it('returns objects with id and label properties', () => {
      const items = getNavItems('experience', 'en');
      for (const item of items) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('label');
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
      }
    });

    it('returns an empty array for an unknown category', () => {
      const items = getNavItems('nonexistent', 'en');
      expect(items).toEqual([]);
    });

    it('returns an empty array for an empty-string category', () => {
      const items = getNavItems('', 'en');
      expect(items).toEqual([]);
    });

    // locale-specific labels
    it('returns French labels when locale is "fr"', () => {
      const items = getNavItems('skills', 'fr');
      const projectsItem = items.find((i) => i.id === 'projects');
      expect(projectsItem).toBeDefined();
      expect(projectsItem!.label).toBe('Projets');
    });

    it('returns German labels when locale is "de"', () => {
      const items = getNavItems('skills', 'de');
      const projectsItem = items.find((i) => i.id === 'projects');
      expect(projectsItem).toBeDefined();
      expect(projectsItem!.label).toBe('Projekte');
    });

    it('returns Spanish labels when locale is "es"', () => {
      const items = getNavItems('about_me', 'es');
      const infosItem = items.find((i) => i.id === 'infos');
      expect(infosItem).toBeDefined();
      expect(infosItem!.label).toBe('Mis informaciones');
    });

    it('falls back to English label when locale is unknown', () => {
      const items = getNavItems('hobbies', 'ja');
      const novelsItem = items.find((i) => i.id === 'graphic-novels');
      expect(novelsItem).toBeDefined();
      expect(novelsItem!.label).toBe('Graphic Novels');
    });

    it('falls back to English label when locale is empty string', () => {
      const items = getNavItems('hobbies', '');
      const novelsItem = items.find((i) => i.id === 'graphic-novels');
      expect(novelsItem).toBeDefined();
      expect(novelsItem!.label).toBe('Graphic Novels');
    });

    // Verify specific category contents
    it('returns 5 items for experience', () => {
      expect(getNavItems('experience', 'en')).toHaveLength(5);
    });

    it('returns 3 items for education', () => {
      expect(getNavItems('education', 'en')).toHaveLength(3);
    });

    it('returns 3 items for skills', () => {
      expect(getNavItems('skills', 'en')).toHaveLength(3);
    });

    it('returns 3 items for about_me', () => {
      expect(getNavItems('about_me', 'en')).toHaveLength(3);
    });

    it('returns 1 item for hobbies', () => {
      expect(getNavItems('hobbies', 'en')).toHaveLength(1);
    });

    it('returns 9 items for posts (including archived)', () => {
      expect(getNavItems('posts', 'en')).toHaveLength(9);
    });

    it('returns correct ids for experience category', () => {
      const ids = getNavItems('experience', 'en').map((i) => i.id);
      expect(ids).toContain('Wiremind');
      expect(ids).toContain('Junior-42-Paris');
      expect(ids).toContain('ESF-Sciences-Humaines');
      expect(ids).toContain('Editions-Denoel');
      expect(ids).toContain('Flammarion');
    });

    it('returns correct ids for posts category', () => {
      const ids = getNavItems('posts', 'en').map((i) => i.id);
      expect(ids).toContain('ssg-ssr');
      expect(ids).toContain('pre-rendering');
    });
  });

  // ---------- getSortedItems ----------
  describe('getSortedItems', () => {
    const ALL_CATEGORIES = ['experience', 'education', 'skills', 'about_me', 'hobbies', 'posts'];

    it.each(ALL_CATEGORIES)('returns a non-empty array for category "%s"', (category) => {
      const items = getSortedItems(category, 'en');
      expect(items.length).toBeGreaterThan(0);
    });

    it('returns objects with id, date, and title properties', () => {
      const items = getSortedItems('experience', 'en');
      for (const item of items) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('title');
        expect(typeof item.id).toBe('string');
        expect(typeof item.date).toBe('string');
        expect(typeof item.title).toBe('string');
      }
    });

    it('returns an empty array for an unknown category', () => {
      const items = getSortedItems('nonexistent', 'en');
      expect(items).toEqual([]);
    });

    it('returns an empty array for an empty-string category', () => {
      const items = getSortedItems('', 'en');
      expect(items).toEqual([]);
    });

    // Sort order tests
    it('returns experience items sorted by date descending', () => {
      const items = getSortedItems('experience', 'en');
      for (let i = 1; i < items.length; i++) {
        expect(items[i - 1].date >= items[i].date).toBe(true);
      }
    });

    it('returns posts sorted by date descending', () => {
      const items = getSortedItems('posts', 'en');
      // Newest registry entry on the latest date wins; archived posts excluded
      expect(items[0].id).toBe('monolith-to-microservice');
      expect(items[0].date).toBe('2026-05-03');
      // Verify all posts are sorted descending
      for (let i = 1; i < items.length; i++) {
        expect(items[i - 1].date >= items[i].date).toBe(true);
      }
    });

    it('returns education items sorted by date descending', () => {
      const items = getSortedItems('education', 'en');
      for (let i = 1; i < items.length; i++) {
        expect(items[i - 1].date >= items[i].date).toBe(true);
      }
    });

    it('sorts items with the same date in stable order', () => {
      // skills, about_me, and hobbies all have the same date '2022-05-12'
      const items = getSortedItems('skills', 'en');
      // All have the same date, so order should remain stable
      expect(items).toHaveLength(3);
      for (const item of items) {
        expect(item.date).toBe('2022-05-12');
      }
    });

    // Locale tests
    it('returns French titles when locale is "fr"', () => {
      const items = getSortedItems('hobbies', 'fr');
      const novelsItem = items.find((i) => i.id === 'graphic-novels');
      expect(novelsItem).toBeDefined();
      expect(novelsItem!.title).toBe('Romans graphiques');
    });

    it('returns German titles when locale is "de"', () => {
      const items = getSortedItems('about_me', 'de');
      const langItem = items.find((i) => i.id === 'languages');
      expect(langItem).toBeDefined();
      expect(langItem!.title).toBe('Sprachen');
    });

    it('returns Spanish titles when locale is "es"', () => {
      const items = getSortedItems('hobbies', 'es');
      const graphicItem = items.find((i) => i.id === 'graphic-novels');
      expect(graphicItem).toBeDefined();
      expect(graphicItem!.title).toBe('Novelas gráficas');
    });

    it('falls back to English title for unknown locale', () => {
      const items = getSortedItems('posts', 'zh');
      const item = items.find((i) => i.id === 'building-modern-blog');
      expect(item).toBeDefined();
      expect(item!.title).toBe('Building a Modern Blog with Next.js App Router');
    });

    it('falls back to English title for empty-string locale', () => {
      const items = getSortedItems('posts', '');
      const item = items.find((i) => i.id === 'next-intl-guide');
      expect(item).toBeDefined();
      expect(item!.title).toBe('Internationalization with next-intl');
    });

    // Verify the correct number of items per category (posts excludes archived)
    it.each([
      ['experience', 5],
      ['education', 3],
      ['skills', 3],
      ['about_me', 3],
      ['hobbies', 1],
      ['posts', 7],
    ] as const)('returns %i items for category "%s"', (category, count) => {
      expect(getSortedItems(category, 'en')).toHaveLength(count);
    });

    // startDate/endDate tests
    it('includes startDate and endDate for experience items', () => {
      const items = getSortedItems('experience', 'en');
      for (const item of items) {
        expect(item.startDate).toBeDefined();
        expect(item.endDate).toBeDefined();
        expect(typeof item.startDate).toBe('string');
        expect(typeof item.endDate).toBe('string');
      }
    });

    it('includes startDate and endDate for education items', () => {
      const items = getSortedItems('education', 'en');
      for (const item of items) {
        expect(item.startDate).toBeDefined();
        expect(item.endDate).toBeDefined();
      }
    });

    it('returns undefined startDate/endDate for categories without dates', () => {
      const items = getSortedItems('skills', 'en');
      for (const item of items) {
        expect(item.startDate).toBeUndefined();
        expect(item.endDate).toBeUndefined();
      }
    });
  });

  // ---------- getRelatedPosts ----------
  describe('getRelatedPosts', () => {
    it('returns related posts that share tags', () => {
      const related = getRelatedPosts('building-modern-blog', 'en');
      expect(related.length).toBeGreaterThan(0);
      // typescript-react-patterns shares the 'react' tag with building-modern-blog
      expect(related.map((p) => p.id)).toContain('typescript-react-patterns');
    });

    it('does not include the current post in results', () => {
      const related = getRelatedPosts('building-modern-blog', 'en');
      expect(related.find((p) => p.id === 'building-modern-blog')).toBeUndefined();
    });

    it('does not surface archived posts', () => {
      // ssg-ssr and pre-rendering are archived; they share tags with active posts
      // but should never appear in related results
      const related = getRelatedPosts('building-modern-blog', 'en');
      expect(related.find((p) => p.id === 'ssg-ssr')).toBeUndefined();
      expect(related.find((p) => p.id === 'pre-rendering')).toBeUndefined();
    });

    it('returns empty array for unknown post id', () => {
      const related = getRelatedPosts('nonexistent', 'en');
      expect(related).toEqual([]);
    });

    it('returns localized titles', () => {
      const relatedFr = getRelatedPosts('building-modern-blog', 'fr');
      const relatedEn = getRelatedPosts('building-modern-blog', 'en');
      expect(relatedFr.length).toBeGreaterThan(0);
      expect(relatedEn.length).toBeGreaterThan(0);
      // Same first match, different localized title
      expect(relatedFr[0].id).toBe(relatedEn[0].id);
      expect(relatedFr[0].title).not.toBe(relatedEn[0].title);
    });

    it('returns localized descriptions', () => {
      const related = getRelatedPosts('building-modern-blog', 'de');
      expect(related.length).toBeGreaterThan(0);
      expect(related[0].description).toBeTruthy();
    });

    it('includes tags in results', () => {
      const related = getRelatedPosts('building-modern-blog', 'en');
      expect(related[0].tags).toBeInstanceOf(Array);
      expect(related[0].tags.length).toBeGreaterThan(0);
    });

    it('respects the limit parameter', () => {
      const related = getRelatedPosts('building-modern-blog', 'en', 1);
      expect(related.length).toBeLessThanOrEqual(1);
    });

    it('falls back to English for unknown locale', () => {
      const related = getRelatedPosts('typescript-react-patterns', 'zh');
      expect(related.length).toBeGreaterThan(0);
      // All titles should be in English
      for (const post of related) {
        expect(post.title).toBeTruthy();
      }
    });
  });

  // ---------- drafts ----------
  // Jest runs with NODE_ENV=test, so `draftsVisible` is true by default and the
  // suites above see drafts. These re-import the registry with the flag forced
  // off to pin the behaviour the public site actually gets.
  describe('drafts', () => {
    const DRAFT_IDS = [
      'monolith-to-microservice',
      'deploy-process-rework',
      'memory-tests-memlab',
      'ai-augmented-dev',
    ];
    const PUBLISHED_IDS = [
      'building-modern-blog',
      'typescript-react-patterns',
      'next-intl-guide',
    ];

    /** Re-imports lib/registry with draftsVisible stubbed to `visible`. */
    function registryWithDrafts(visible: boolean) {
      let mod!: typeof import('../../lib/registry');
      jest.isolateModules(() => {
        jest.doMock('../../lib/drafts', () => ({draftsVisible: visible}));
        mod = require('../../lib/registry');
      });
      jest.dontMock('../../lib/drafts');
      return mod;
    }

    it('shows drafts in the listing when drafts are visible', () => {
      const ids = registryWithDrafts(true)
        .getSortedItems('posts', 'en')
        .map((p) => p.id);
      for (const id of DRAFT_IDS) expect(ids).toContain(id);
    });

    it('hides drafts from the listing when drafts are not visible', () => {
      const ids = registryWithDrafts(false)
        .getSortedItems('posts', 'en')
        .map((p) => p.id);
      for (const id of DRAFT_IDS) expect(ids).not.toContain(id);
      expect(ids).toEqual(PUBLISHED_IDS);
    });

    it('hides drafts from related posts when drafts are not visible', () => {
      // ai-augmented-dev is a draft with no tag overlap, but monolith-to-
      // microservice shares none either — assert across every published post.
      const {getRelatedPosts: related} = registryWithDrafts(false);
      for (const id of PUBLISHED_IDS) {
        const ids = related(id, 'en').map((p) => p.id);
        for (const draftId of DRAFT_IDS) expect(ids).not.toContain(draftId);
      }
    });

    it('keeps archived posts hidden regardless of draft visibility', () => {
      for (const visible of [true, false]) {
        const ids = registryWithDrafts(visible)
          .getSortedItems('posts', 'en')
          .map((p) => p.id);
        expect(ids).not.toContain('ssg-ssr');
        expect(ids).not.toContain('pre-rendering');
      }
    });
  });
});
