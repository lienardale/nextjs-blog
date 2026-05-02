
const content = {
  en: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        I like them (a lot). I buy them (when I can). I chronicle them (sometimes).
      </p>
    ),
    favoritesTitle: 'My favorites',
  },
  fr: {
    title: 'Romans graphiques',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Je les aime (beaucoup). Je les achète (quand je peux). Je les chronique (parfois).
      </p>
    ),
    favoritesTitle: 'Mes favoris',
  },
  de: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Ich mag sie (sehr). Ich kaufe sie (wenn ich kann). Ich chronifiziere sie (manchmal).
      </p>
    ),
    favoritesTitle: 'Meine Favoriten',
  },
  es: {
    title: 'Novelas gráficas',
    intro: (
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        Me gustan (mucho). Los compro (cuando puedo). Las crónicas (a veces).
      </p>
    ),
    favoritesTitle: 'Mis favoritos',
  },
} as const;

type Locale = keyof typeof content;

const novels = [
  {
    title: 'Blacksad',
    author: 'Juan Díaz Canales & Juanjo Guarnido',
    genre: {en: 'Noir', fr: 'Noir', de: 'Noir', es: 'Noir'},
  },
  {
    title: 'L\'Incal',
    author: 'Alejandro Jodorowsky & Mœbius',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
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
    title: 'Asterios Polyp',
    author: 'David Mazzucchelli',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
  },
  {
    title: 'Blankets',
    author: 'Craig Thompson',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
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
