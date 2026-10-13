/**
 * Topic label shown on the posts list for draft posts.
 *
 * These deliberately do NOT live in `locales/{en,fr,de,es}/common.json`. next-intl ships
 * that whole namespace to the browser for client components, so a draft's
 * strings kept there would appear verbatim in the public page source even
 * though the post itself 404s.
 *
 * Only `app/[locale]/posts/page.tsx` reads this, server-side, and only when
 * `draftsVisible`. Titles, descriptions and reading times come from
 * `lib/registry.ts`. When a post is published, move its topic into the locale
 * files as `posts.topic_*` and delete the entry here.
 */
type DraftListingMeta = {topic: string};

export const draftPostMeta: Record<string, Record<string, DraftListingMeta>> = {
  'monolith-to-microservice': {
    en: {topic: 'Architecture'},
    fr: {topic: 'Architecture'},
    de: {topic: 'Architektur'},
    es: {topic: 'Arquitectura'},
  },
  'deploy-process-rework': {
    en: {topic: 'DevOps'},
    fr: {topic: 'DevOps'},
    de: {topic: 'DevOps'},
    es: {topic: 'DevOps'},
  },
  'memory-tests-memlab': {
    en: {topic: 'Testing'},
    fr: {topic: 'Tests'},
    de: {topic: 'Tests'},
    es: {topic: 'Testing'},
  },
  'ai-augmented-dev': {
    en: {topic: 'AI tooling'},
    fr: {topic: 'Outils IA'},
    de: {topic: 'KI-Tools'},
    es: {topic: 'Herramientas IA'},
  },
};

export function getDraftListingMeta(id: string, locale: string) {
  const byLocale = draftPostMeta[id];
  if (!byLocale) return undefined;
  return byLocale[locale] ?? byLocale.en;
}
