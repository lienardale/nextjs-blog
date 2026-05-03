type ContentItem = {
  id: string;
  date: string;
  title: Record<string, string>;
  tags?: string[];
  description?: Record<string, string>;
  startDate?: string;
  endDate?: string;
};

const registry: Record<string, ContentItem[]> = {
  experience: [
    {id: 'Wiremind', date: '2026-05-02', title: {en: 'Wiremind', fr: 'Wiremind', de: 'Wiremind', es: 'Wiremind'}, startDate: '2022-09', endDate: 'present'},
    {id: 'Junior-42-Paris', date: '2022-05-12', title: {en: 'Junior 42 Paris', fr: 'Junior 42 Paris', de: 'Junior 42 Paris', es: 'Junior 42 Paris'}, startDate: '2020-09', endDate: '2022-05'},
    {id: 'ESF-Sciences-Humaines', date: '2019-09-01', title: {en: 'ESF Sciences Humaines', fr: 'ESF Sciences Humaines', de: 'ESF Sciences Humaines', es: 'ESF Sciences Humaines'}, startDate: '2018-09', endDate: '2019-06'},
    {id: 'Editions-Denoel', date: '2017-09-01', title: {en: 'Editions Denoël', fr: 'Editions Denoël', de: 'Editions Denoël', es: 'Editions Denoël'}, startDate: '2015-09', endDate: '2017-06'},
    {id: 'Flammarion', date: '2015-09-01', title: {en: 'Flammarion', fr: 'Flammarion', de: 'Flammarion', es: 'Flammarion'}, startDate: '2015-02', endDate: '2015-07'},
  ],
  education: [
    {id: '42-Paris', date: '2022-05-12', title: {en: '42 Paris', fr: '42 Paris', de: '42 Paris', es: '42 Paris'}, startDate: '2019-09', endDate: '2022-05'},
    {id: 'IAE-Lille', date: '2017-09-01', title: {en: 'IAE Lille', fr: 'IAE Lille', de: 'IAE Lille', es: 'IAE Lille'}, startDate: '2014-09', endDate: '2017-06'},
    {id: 'CPGE_BL', date: '2014-09-01', title: {en: 'CPGE BL', fr: 'CPGE BL', de: 'CPGE BL', es: 'CPGE BL'}, startDate: '2012-09', endDate: '2014-06'},
  ],
  skills: [
    {id: 'projects', date: '2022-05-12', title: {en: 'Projects', fr: 'Projets', de: 'Projekte', es: 'Projects'}},
    {id: 'soft-skills', date: '2022-05-12', title: {en: 'Soft skills', fr: 'Soft skills', de: 'Soft skills', es: 'Soft skills'}},
    {id: 'stack', date: '2022-05-12', title: {en: 'Stack', fr: 'Stack', de: 'Stack', es: 'Stack'}},
  ],
  about_me: [
    {id: 'infos', date: '2022-05-12', title: {en: 'My infos', fr: 'Mes infos', de: 'Meine Infos', es: 'Mis informaciones'}},
    {id: 'languages', date: '2022-05-12', title: {en: 'Languages', fr: 'Langues', de: 'Sprachen', es: 'Idiomas'}},
    {id: 'cv', date: '2022-05-12', title: {en: 'CV', fr: 'CV', de: 'Lebenslauf', es: 'Currículum'}},
  ],
  hobbies: [
    {id: 'biking', date: '2022-05-12', title: {en: 'Biking', fr: 'Vélo', de: 'Radfahren', es: 'Ciclismo'}},
    {id: 'graphic-novels', date: '2022-05-12', title: {en: 'Graphic Novels', fr: 'Romans graphiques', de: 'Graphic Novels', es: 'Novelas gráficas'}},
    {id: 'podcasts', date: '2022-05-12', title: {en: 'Podcasts', fr: 'Podcasts', de: 'Podcasts', es: 'Podcasts'}},
  ],
  posts: [
    {id: 'ssg-ssr', date: '2020-01-02', title: {en: 'When to Use Static Generation v.s. Server-side Rendering', fr: 'Quand utiliser la génération statique ou le rendu côté serveur ?', de: 'Wann sollte man statische Generierung und wann serverseitiges Rendering verwenden?', es: 'Cuándo utilizar la generación estática frente a la renderización del lado del servidor'}, tags: ['nextjs', 'ssg', 'ssr'], description: {en: 'Learn when to choose Static Generation vs Server-side Rendering in Next.js.', fr: 'Apprenez quand choisir la Génération Statique ou le Rendu Côté Serveur dans Next.js.', de: 'Erfahren Sie, wann Sie Statische Generierung oder Serverseitiges Rendering in Next.js wählen sollten.', es: 'Aprende cuándo elegir Generación Estática frente a Renderización del Lado del Servidor en Next.js.'}},
    {id: 'pre-rendering', date: '2020-01-01', title: {en: 'Two Forms of Pre-rendering', fr: 'Deux formes de pré-rendering', de: 'Zwei Formen des Pre-Rendering', es: 'Dos formas de pre-renderización'}, tags: ['nextjs', 'ssg', 'ssr', 'react'], description: {en: 'Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering.', fr: 'Next.js propose deux formes de pré-rendu : Génération Statique et Rendu Côté Serveur.', de: 'Next.js hat zwei Formen des Pre-Rendering: Statische Generierung und Serverseitiges Rendering.', es: 'Next.js tiene dos formas de pre-renderización: Generación Estática y Renderización del Lado del Servidor.'}},
    {id: 'building-modern-blog', date: '2026-03-15', title: {en: 'Building a Modern Blog with Next.js App Router', fr: 'Construire un blog moderne avec le App Router de Next.js', de: 'Einen modernen Blog mit dem Next.js App Router erstellen', es: 'Construyendo un blog moderno con el App Router de Next.js'}, tags: ['nextjs', 'app-router', 'react'], description: {en: 'A guide to building a performant blog using the Next.js App Router with server components.', fr: 'Un guide pour construire un blog performant avec le App Router de Next.js et les composants serveur.', de: 'Eine Anleitung zum Erstellen eines performanten Blogs mit dem Next.js App Router und Server-Komponenten.', es: 'Una guia para construir un blog eficiente usando el App Router de Next.js con componentes de servidor.'}},
    {id: 'typescript-react-patterns', date: '2026-03-10', title: {en: 'TypeScript Patterns for React 19', fr: 'Patterns TypeScript pour React 19', de: 'TypeScript-Patterns für React 19', es: 'Patrones TypeScript para React 19'}, tags: ['typescript', 'react', 'patterns'], description: {en: 'Essential TypeScript patterns for writing type-safe React 19 components.', fr: 'Les patterns TypeScript essentiels pour des composants React 19 type-safe.', de: 'Essentielle TypeScript-Patterns für typsichere React 19-Komponenten.', es: 'Patrones TypeScript esenciales para componentes React 19 con tipado seguro.'}},
    {id: 'next-intl-guide', date: '2026-03-05', title: {en: 'Internationalization with next-intl', fr: 'Internationalisation avec next-intl', de: 'Internationalisierung mit next-intl', es: 'Internacionalización con next-intl'}, tags: ['nextjs', 'i18n', 'next-intl'], description: {en: 'How to add multi-language support to your Next.js app using next-intl.', fr: 'Comment ajouter le support multilingue à votre application Next.js avec next-intl.', de: 'Wie Sie mit next-intl mehrsprachige Unterstützung zu Ihrer Next.js-App hinzufügen.', es: 'Cómo agregar soporte multilingüe a tu aplicación Next.js usando next-intl.'}},
  ],
};

export function getNavItems(category: string, locale: string) {
  const items = registry[category] ?? [];
  return items.map((item) => ({
    id: item.id,
    label: item.title[locale] ?? item.title.en,
  }));
}

export function getSortedItems(category: string, locale: string) {
  const items = registry[category] ?? [];
  return items
    .map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title[locale] ?? item.title.en,
      startDate: item.startDate,
      endDate: item.endDate,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getRelatedPosts(postId: string, locale: string, limit = 3) {
  const posts = registry.posts ?? [];
  const current = posts.find((p) => p.id === postId);
  if (!current?.tags?.length) return [];

  const currentTags = new Set(current.tags);

  return posts
    .filter((p) => p.id !== postId && p.tags?.length)
    .map((p) => {
      const matchCount = p.tags!.filter((tag) => currentTags.has(tag)).length;
      return {
        id: p.id,
        date: p.date,
        title: p.title[locale] ?? p.title.en,
        description: p.description?.[locale] ?? p.description?.en ?? '',
        tags: p.tags!,
        matchCount,
      };
    })
    .filter((p) => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
