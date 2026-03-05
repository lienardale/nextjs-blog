type ContentItem = {id: string; date: string; title: Record<string, string>};

const registry: Record<string, ContentItem[]> = {
  experience: [
    {id: 'Junior-42-Paris', date: '2022-05-12', title: {en: 'Junior 42 Paris', fr: 'Junior 42 Paris', de: 'Junior 42 Paris', es: 'Junior 42 Paris'}},
    {id: 'ESF-Sciences-Humaines', date: '2019-09-01', title: {en: 'ESF Sciences Humaines', fr: 'ESF Sciences Humaines', de: 'ESF Sciences Humaines', es: 'ESF Sciences Humaines'}},
    {id: 'Editions-Denoel', date: '2017-09-01', title: {en: 'Editions Denoël', fr: 'Editions Denoël', de: 'Editions Denoël', es: 'Editions Denoël'}},
    {id: 'Flammarion', date: '2015-09-01', title: {en: 'Flammarion', fr: 'Flammarion', de: 'Flammarion', es: 'Flammarion'}},
  ],
  education: [
    {id: '42-Paris', date: '2022-05-12', title: {en: '42 Paris', fr: '42 Paris', de: '42 Paris', es: '42 Paris'}},
    {id: 'IAE-Lille', date: '2017-09-01', title: {en: 'IAE Lille', fr: 'IAE Lille', de: 'IAE Lille', es: 'IAE Lille'}},
    {id: 'CPGE_BL', date: '2014-09-01', title: {en: 'CPGE BL', fr: 'CPGE BL', de: 'CPGE BL', es: 'CPGE BL'}},
  ],
  skills: [
    {id: 'projects', date: '2022-05-12', title: {en: 'Projects', fr: 'Projets', de: 'Projekte', es: 'Projects'}},
    {id: 'soft-skills', date: '2022-05-12', title: {en: 'Soft skills', fr: 'Soft skills', de: 'Soft skills', es: 'Soft skills'}},
    {id: 'stack', date: '2022-05-12', title: {en: 'Stack', fr: 'Stack', de: 'Stack', es: 'Stack'}},
  ],
  about_me: [
    {id: 'infos', date: '2022-05-12', title: {en: 'My infos', fr: 'Mes infos', de: 'Meine Infos', es: 'Mis informaciones'}},
    {id: 'languages', date: '2022-05-12', title: {en: 'Languages', fr: 'Langues', de: 'Sprachen', es: 'Idiomas'}},
  ],
  hobbies: [
    {id: 'biking', date: '2022-05-12', title: {en: 'Biking', fr: 'Vélo', de: 'Radfahren', es: 'Ciclismo'}},
    {id: 'graphic-novels', date: '2022-05-12', title: {en: 'Graphic Novels', fr: 'Romans graphiques', de: 'Graphic Novels', es: 'Novelas gráficas'}},
    {id: 'podcasts', date: '2022-05-12', title: {en: 'Podcasts', fr: 'Podcasts', de: 'Podcasts', es: 'Podcasts'}},
  ],
  posts: [
    {id: 'ssg-ssr', date: '2020-01-02', title: {en: 'When to Use Static Generation v.s. Server-side Rendering', fr: 'Quand utiliser la génération statique ou le rendu côté serveur ?', de: 'Wann sollte man statische Generierung und wann serverseitiges Rendering verwenden?', es: 'Cuándo utilizar la generación estática frente a la renderización del lado del servidor'}},
    {id: 'pre-rendering', date: '2020-01-01', title: {en: 'Two Forms of Pre-rendering', fr: 'Deux formes de pré-rendering', de: 'Zwei Formen des Pre-Rendering', es: 'Dos formas de pre-renderización'}},
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
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
