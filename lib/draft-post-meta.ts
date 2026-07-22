/**
 * Listing strings (display title / topic pill / read time) for draft posts.
 *
 * These deliberately do NOT live in `locales/{en,fr,de,es}/common.json`. next-intl ships
 * that whole namespace to the browser for client components, so a draft title
 * kept there would appear verbatim in the public page source — publishing the
 * headline of unpublished work even though the post itself 404s.
 *
 * Only `app/[locale]/posts/page.tsx` reads this, server-side, and only when
 * `draftsVisible`. When a post is published, move its strings into the locale
 * files as `posts.title_*` / `posts.topic_*` / `posts.read_*` and delete the
 * entry here.
 */
type DraftListingMeta = {title: string; topic: string; read: string};

export const draftPostMeta: Record<string, Record<string, DraftListingMeta>> = {
  'monolith-to-microservice': {
    en: {title: 'Decoupling a critical service from a <em>monolith.</em>', topic: 'Architecture', read: '9 min'},
    fr: {title: 'Découper un service critique d’un <em>monolithe.</em>', topic: 'Architecture', read: '9 min'},
    de: {title: 'Einen kritischen Dienst aus einem <em>Monolithen</em> herauslösen.', topic: 'Architektur', read: '9 Min.'},
    es: {title: 'Desacoplar un servicio crítico de un <em>monolito.</em>', topic: 'Arquitectura', read: '9 min'},
  },
  'deploy-process-rework': {
    en: {title: 'Reworking a deploy process for a <em>whole team.</em>', topic: 'DevOps', read: '6 min'},
    fr: {title: 'Refondre le déploiement d’une <em>équipe entière.</em>', topic: 'DevOps', read: '6 min'},
    de: {title: 'Den Deploy-Prozess für ein <em>ganzes Team</em> neu denken.', topic: 'DevOps', read: '6 Min.'},
    es: {title: 'Rehacer el despliegue de un <em>equipo entero.</em>', topic: 'DevOps', read: '6 min'},
  },
  'memory-tests-memlab': {
    en: {title: 'Memory tests with <em>memlab</em> — what they catch, what they don’t.', topic: 'Testing', read: '5 min'},
    fr: {title: 'Tests mémoire avec <em>memlab</em> — ce qu’ils attrapent, ce qu’ils ratent.', topic: 'Tests', read: '5 min'},
    de: {title: 'Memory-Tests mit <em>memlab</em> — was sie finden und was nicht.', topic: 'Tests', read: '5 Min.'},
    es: {title: 'Tests de memoria con <em>memlab</em> — lo que detectan y lo que no.', topic: 'Testing', read: '5 min'},
  },
  'ai-augmented-dev': {
    en: {title: 'A year of <em>AI-augmented</em> development.', topic: 'AI tooling', read: '8 min'},
    fr: {title: 'Un an de développement <em>augmenté par l’IA.</em>', topic: 'Outils IA', read: '8 min'},
    de: {title: 'Ein Jahr <em>KI-gestützter</em> Entwicklung.', topic: 'KI-Tools', read: '8 Min.'},
    es: {title: 'Un año de desarrollo <em>aumentado por IA.</em>', topic: 'Herramientas IA', read: '8 min'},
  },
};

export function getDraftListingMeta(id: string, locale: string) {
  const byLocale = draftPostMeta[id];
  if (!byLocale) return undefined;
  return byLocale[locale] ?? byLocale.en;
}
