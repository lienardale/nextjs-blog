
const content = {
  en: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 italic mb-6">
        I like them (a lot). I buy them (when I can).
      </p>
    ),
    favoritesTitle: 'On the shelf',
  },
  fr: {
    title: 'Romans graphiques',
    intro: (
      <p className="text-gray-600 italic mb-6">
        Je les aime (beaucoup). J’en achète (quand je peux).
      </p>
    ),
    favoritesTitle: 'Sur l’étagère',
  },
  de: {
    title: 'Graphic Novels',
    intro: (
      <p className="text-gray-600 italic mb-6">
        Ich mag sie (sehr). Ich kaufe sie (wenn ich kann).
      </p>
    ),
    favoritesTitle: 'Im Regal',
  },
  es: {
    title: 'Novelas gráficas',
    intro: (
      <p className="text-gray-600 italic mb-6">
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
    c1: '#6b1f3a', c2: '#a14464',
    cover_url: '/covers/asterios-polyp.jpg',
    take: 'Mazzucchelli’s masterclass on language, memory, and a cracked architect rebuilding himself.',
  },
  {
    title: 'Maus',
    author: 'Art Spiegelman',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#2a2a2a', c2: '#5a5a5a',
    cover_url: '/covers/maus.jpg',
    take: 'Spiegelman draws his father’s Holocaust testimony as cats and mice, without flinching.',
  },
  {
    title: 'Persepolis',
    author: 'Marjane Satrapi',
    genre: {en: 'Autobiography', fr: 'Autobiographie', de: 'Autobiographie', es: 'Autobiografía'},
    c1: '#1a3a4a', c2: '#3d6c84',
    cover_url: '/covers/persepolis.jpg',
    take: 'A childhood in revolutionary Iran, drawn in stark black and white.',
  },
  {
    title: 'Blankets',
    author: 'Craig Thompson',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#3a2a14', c2: '#7a5a32',
    cover_url: '/covers/blankets.jpg',
    take: 'A first-love memoir wrapped in falling snow and small-town faith.',
  },
  {
    title: 'Blast',
    author: 'Manu Larcenet',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
    c1: '#1a1a1f', c2: '#4a4452',
    cover_url: '/covers/blast.jpg',
    take: 'Four volumes of weight, hunger, and a man walking out of his own life.',
  },
  {
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
    c1: '#a02818', c2: '#e85c1a',
    cover_url: '/covers/akira.jpg',
    take: 'Sprawling neon dystopia that redrew what manga could do on the page.',
  },
  {
    title: 'Herakles',
    author: 'Édouard Cour',
    genre: {en: 'Mythology', fr: 'Mythologie', de: 'Mythologie', es: 'Mitología'},
    c1: '#5a3814', c2: '#b58430',
    cover_url: '/covers/herakles.jpg',
    take: 'The labors retold as a tired man’s burden — mythology with calloused hands.',
  },
  {
    title: 'Le Grand Vide',
    author: 'Léa Murawiec',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
    c1: '#4a2a5a', c2: '#8856a0',
    cover_url: '/covers/le-grand-vide.jpg',
    take: 'A debut where existence is rationed by attention — quietly devastating.',
  },
  {
    title: 'Preference System',
    author: 'Bienvenu',
    genre: {en: 'Slice of life', fr: 'Tranche de vie', de: 'Slice of Life', es: 'Slice of life'},
    c1: '#2a4a3a', c2: '#5a7a6c',
    cover_url: '/covers/preference-system.jpg',
    take: 'An experimental loop on choice, platforms, and the lives we tap into being.',
  },
  {
    title: 'L’Épopée Espagnole',
    author: 'Antonio Altarriba',
    genre: {en: 'Historical', fr: 'Historique', de: 'Historisch', es: 'Histórico'},
    c1: '#6a2818', c2: '#b04a30',
    cover_url: '/covers/l-epopee-espagnole.jpg',
    take: 'A father’s life as a window onto the whole twentieth century in Spain.',
  },
  {
    title: 'Gunnm',
    author: 'Yukito Kishiro',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
    c1: '#3a3a4c', c2: '#6868a0',
    cover_url: '/covers/gunnm.jpg',
    take: 'A cyborg coming-of-age through the scrapyard underworld — leaner than it looks.',
  },
  {
    title: 'Le Sommet des Dieux',
    author: 'Jirō Taniguchi',
    genre: {en: 'Adventure', fr: 'Aventure', de: 'Abenteuer', es: 'Aventura'},
    c1: '#3a4a52', c2: '#7088a0',
    cover_url: '/covers/le-sommet-des-dieux.jpg',
    take: 'Obsession, Everest, and the kind of silence Taniguchi draws better than anyone.',
  },
  {
    title: 'Monster',
    author: 'Naoki Urasawa',
    genre: {en: 'Thriller', fr: 'Thriller', de: 'Thriller', es: 'Thriller'},
    c1: '#1a1a1f', c2: '#4a4452',
    cover_url: '/covers/monster.jpg',
    take: 'A relentless thriller built around a doctor who saved the wrong child.',
  },
  {
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    genre: {en: 'Fantasy', fr: 'Fantasy', de: 'Fantasy', es: 'Fantasía'},
    c1: '#5a4814', c2: '#b58e30',
    cover_url: '/covers/fullmetal-alchemist.jpg',
    take: 'Brothers, equivalent exchange, and one of the cleanest endings in long-form manga.',
  },
  {
    title: 'Solanin',
    author: 'Inio Asano',
    genre: {en: 'Slice of life', fr: 'Tranche de vie', de: 'Slice of Life', es: 'Slice of life'},
    c1: '#6a5e4a', c2: '#a89878',
    cover_url: '/covers/solanin.jpg',
    take: 'The post-graduate years where the dream politely runs out — and what comes after.',
  },
  {
    title: 'Bouddha',
    author: 'Osamu Tezuka',
    genre: {en: 'Historical', fr: 'Historique', de: 'Historisch', es: 'Histórico'},
    c1: '#4a3018', c2: '#b08648',
    cover_url: '/covers/bouddha.jpg',
    take: 'Tezuka’s decade-long retelling of Siddhartha — playful, sweeping, surprisingly funny.',
  },
  {
    title: 'Palestine',
    author: 'Joe Sacco',
    genre: {en: 'Reportage', fr: 'Reportage', de: 'Reportage', es: 'Reportaje'},
    c1: '#2a4438', c2: '#6a8470',
    cover_url: '/covers/palestine.jpg',
    take: 'Comics journalism from the first intifada — the form invented to fit the subject.',
  },
  {
    title: 'Capacity',
    author: 'Theo Ellsworth',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
    c1: '#4a2a48', c2: '#8854a0',
    cover_url: '/covers/capacity.jpg',
    take: 'A metafictional notebook about making the book you are currently holding.',
  },
  {
    title: 'Jimmy Corrigan',
    author: 'Chris Ware',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
    c1: '#4a4838', c2: '#8a8862',
    cover_url: '/covers/jimmy-corrigan.jpg',
    take: 'Three generations of loneliness laid out in Ware’s impossibly precise architecture.',
  },
  {
    title: 'Demon',
    author: 'Jason Shiga',
    genre: {en: 'Thriller', fr: 'Thriller', de: 'Thriller', es: 'Thriller'},
    c1: '#38181a', c2: '#783040',
    cover_url: '/covers/demon.jpg',
    take: 'A brutal logic puzzle about a man who can’t die — far darker than its grid suggests.',
  },
  {
    title: 'My Friend Dahmer',
    author: 'Derf Backderf',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#383028', c2: '#685a4c',
    cover_url: '/covers/my-friend-dahmer.jpg',
    take: 'A high-school memoir from the kid who sat next to the future serial killer.',
  },
  {
    title: 'NonNonBâ',
    author: 'Shigeru Mizuki',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#3a4458', c2: '#6a7898',
    cover_url: '/covers/nonnonbâ.jpg',
    take: 'A wartime childhood, taught the ghost stories of Tottori by the family’s old maid.',
  },
  {
    title: 'Culottées',
    author: 'Pénélope Bagieu',
    genre: {en: 'Biography', fr: 'Biographie', de: 'Biographie', es: 'Biografía'},
    c1: '#7a2848', c2: '#b04068',
    cover_url: '/covers/culottees.jpg',
    take: 'Thirty short portraits of women history almost let slip away.',
  },
  {
    title: 'Gemma Bovery',
    author: 'Posy Simmonds',
    genre: {en: 'Literary', fr: 'Littéraire', de: 'Literarisch', es: 'Literario'},
    c1: '#4a4438', c2: '#786850',
    cover_url: '/covers/gemma-bovery.jpg',
    take: 'Flaubert rewritten in an English village, drawn with pen-and-pencil deadpan.',
  },
  {
    title: 'Fun Home',
    author: 'Alison Bechdel',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#3a3838', c2: '#685e58',
    cover_url: '/covers/fun-home.jpg',
    take: 'A father, a daughter, the house, the closet, the books — every layer doing work.',
  },
  {
    title: 'Bea Wolf',
    author: 'Zach Weinersmith & Boulet',
    genre: {en: 'Adventure', fr: 'Aventure', de: 'Abenteuer', es: 'Aventura'},
    c1: '#4a3818', c2: '#a07840',
    cover_url: '/covers/bea-wolf.jpg',
    take: 'Beowulf transposed to a treehouse and a band of sugar-fueled kids — fully committed.',
  },
  {
    title: 'L’Ascension du Haut Mal',
    author: 'David B.',
    genre: {en: 'Memoir', fr: 'Mémoires', de: 'Memoir', es: 'Memorias'},
    c1: '#2a2c38', c2: '#5a5c70',
    cover_url: '/covers/l-ascension-du-haut-mal.jpg',
    take: 'A brother’s epilepsy and the family’s long search, in some of the densest art on the page.',
  },
  {
    title: 'New York',
    author: 'Will Eisner',
    genre: {en: 'Anthology', fr: 'Anthologie', de: 'Anthologie', es: 'Antología'},
    c1: '#1a2434', c2: '#4a5c70',
    cover_url: '/covers/new-york.jpg',
    take: 'Tenement vignettes drawn at street-corner pace — the city as a cast of characters.',
  },
  {
    title: 'Patience',
    author: 'Daniel Clowes',
    genre: {en: 'Sci-Fi', fr: 'Science-fiction', de: 'Sci-Fi', es: 'Ciencia ficción'},
    c1: '#5a2a3a', c2: '#8a4c5a',
    cover_url: '/covers/patience.jpg',
    take: 'A time-travel love story Clowes drew over a decade — restrained, then suddenly not.',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {novels.map((novel) => (
            <div
              key={novel.title}
              data-testid="graphic-novel-card"
              className="border border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              <div
                className="h-120 flex items-end p-1"
                style={{
                  backgroundImage: `url(${novel.cover_url}), linear-gradient(135deg, ${novel.c1}, ${novel.c2})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',

                }}
              >
                {/* <img
                  src={novel.cover_url}
                  alt={`Couverture de ${novel.title}`}
                  className="w-40 rounded-md shadow-md"
                /> */}
                <h3 className="font-semibold text-white text-lg leading-tight drop-shadow-sm">
                  {novel.title}
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm text-gray-500">{novel.author}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 whitespace-nowrap">
                    {novel.genre[locale as Locale] ?? novel.genre.en}
                  </span>
                </div>
                <p className="text-sm text-gray-700 italic leading-snug">{novel.take}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
