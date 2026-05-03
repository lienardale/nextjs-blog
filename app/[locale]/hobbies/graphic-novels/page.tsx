
const content = {
  en: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        I like them (a lot). I buy them (when I can).
      </p>
    ),
    favoritesTitle: 'On the shelf',
  },
  fr: {
    title: 'Romans graphiques',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Je les aime (beaucoup). J’en achète (quand je peux).
      </p>
    ),
    favoritesTitle: 'Sur l’étagère',
  },
  de: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Ich mag sie (sehr). Ich kaufe sie (wenn ich kann).
      </p>
    ),
    favoritesTitle: 'Im Regal',
  },
  es: {
    title: 'Novelas gráficas',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Me gustan (mucho). Los compro (cuando puedo).
      </p>
    ),
    favoritesTitle: 'En la estantería',
  },
} as const;

type Locale = keyof typeof content;

const novels = [
  {
    title: 'Asterios Polyp',
    author: 'David Mazzucchelli',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Maus',
    author: 'Art Spiegelman',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'Persepolis',
    author: 'Marjane Satrapi',
    genre: {en: 'Autobiography', fr: 'Autobiographie', de: 'Autobiographie', es: 'Autobiografía'},
  },
  {
    title: 'Blankets',
    author: 'Craig Thompson',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'Blast',
    author: 'Manu Larcenet',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
  },
  {
    title: 'Herakles',
    author: 'Édouard Cour',
    genre: {en: 'Mythology', fr: 'Mythologie', de: 'Mythologie', es: 'Mitología'},
  },
  {
    title: 'Le Grand Vide',
    author: 'Léa Murawiec',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
  },
  {
    title: 'Preference System',
    author: 'Bienvenu',
    genre: {en: 'Slice of life', fr: 'Tranche de vie', de: 'Slice of Life', es: 'Slice of life'},
  },
  {
    title: 'L’Épopée Espagnole',
    author: 'Antonio Altarriba',
    genre: {en: 'Historical', fr: 'Historique', de: 'Historisch', es: 'Histórico'},
  },
  {
    title: 'Gunnm',
    author: 'Yukito Kishiro',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
  },
  {
    title: 'Le Sommet des Dieux',
    author: 'Jirō Taniguchi',
    genre: {en: 'Adventure', fr: 'Aventure', de: 'Abenteuer', es: 'Aventura'},
  },
  {
    title: 'Monster',
    author: 'Naoki Urasawa',
    genre: {en: 'Thriller', fr: 'Thriller', de: 'Thriller', es: 'Thriller'},
  },
  {
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    genre: {en: 'Fantasy', fr: 'Fantasy', de: 'Fantasy', es: 'Fantasía'},
  },
  {
    title: 'Solanin',
    author: 'Inio Asano',
    genre: {en: 'Slice of life', fr: 'Tranche de vie', de: 'Slice of Life', es: 'Slice of life'},
  },
  {
    title: 'Bouddha',
    author: 'Osamu Tezuka',
    genre: {en: 'Historical', fr: 'Historique', de: 'Historisch', es: 'Histórico'},
  },
  {
    title: 'Palestine',
    author: 'Joe Sacco',
    genre: {en: 'Reportage', fr: 'Reportage', de: 'Reportage', es: 'Reportaje'},
  },
  {
    title: 'Capacity',
    author: 'Theo Ellsworth',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Jimmy Corrigan',
    author: 'Chris Ware',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Demon',
    author: 'Jason Shiga',
    genre: {en: 'Thriller', fr: 'Thriller', de: 'Thriller', es: 'Thriller'},
  },
  {
    title: 'My Friend Dahmer',
    author: 'Derf Backderf',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'NonNonBâ',
    author: 'Shigeru Mizuki',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'Culottées',
    author: 'Pénélope Bagieu',
    genre: {en: 'Biography', fr: 'Biographie', de: 'Biographie', es: 'Biografía'},
  },
  {
    title: 'Gemma Bovery',
    author: 'Posy Simmonds',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Fun Home',
    author: 'Alison Bechdel',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'Bea Wolf',
    author: 'Zach Weinersmith & Boulet',
    genre: {en: 'Adventure', fr: 'Aventure', de: 'Abenteuer', es: 'Aventura'},
  },
  {
    title: 'L’Ascension du Haut Mal',
    author: 'David B.',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
  },
  {
    title: 'New York',
    author: 'Will Eisner',
    genre: {en: 'Anthology', fr: 'Anthologie', de: 'Anthologie', es: 'Antología'},
  },
  {
    title: 'Patience',
    author: 'Daniel Clowes',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
  },
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function GraphicNovelsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        {t.intro}

        <h2 className="text-xl font-bold mb-4">{t.favoritesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {novels.map((novel) => (
            <div
              key={novel.title}
              data-testid="graphic-novel-card"
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{novel.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 whitespace-nowrap">
                  {novel.genre[locale as Locale] ?? novel.genre.en}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{novel.author}</p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
