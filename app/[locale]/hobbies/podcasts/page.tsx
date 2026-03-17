import Header from '../../components/Header';

const content = {
  en: {
    title: 'Podcasts',
    intro: 'I listen to them (a lot):',
  },
  fr: {
    title: 'Podcasts',
    intro: 'Je les écoute (beaucoup) :',
  },
  de: {
    title: 'Podcasts',
    intro: 'Ich höre sie (oft):',
  },
  es: {
    title: 'Podcasts',
    intro: 'Los escucho (mucho):',
  },
} as const;

type Locale = keyof typeof content;

const statusLabels = {
  ended: {en: 'Ended', fr: 'Terminé', de: 'Beendet', es: 'Finalizado'},
  active: {en: 'Active', fr: 'Actif', de: 'Aktiv', es: 'Activo'},
} as const;

const podcasts = [
  {
    name: 'Studio 404',
    status: 'ended' as const,
    description: {
      en: 'French tech & culture podcast that explored the darker side of the internet (2014–2020).',
      fr: 'Podcast tech et culture qui explorait le côté obscur d\'internet (2014–2020).',
      de: 'Französischer Tech- und Kultur-Podcast über die dunklen Seiten des Internets (2014–2020).',
      es: 'Podcast francés de tecnología y cultura que exploraba el lado oscuro de internet (2014–2020).',
    },
  },
  {
    name: 'Floodcast',
    status: 'active' as const,
    description: {
      en: 'Improvised comedy podcast with absurd sketches and recurring characters.',
      fr: 'Podcast de comédie improvisée avec des sketchs absurdes et des personnages récurrents.',
      de: 'Improvisierter Comedy-Podcast mit absurden Sketchen und wiederkehrenden Figuren.',
      es: 'Podcast de comedia improvisada con sketches absurdos y personajes recurrentes.',
    },
  },
  {
    name: 'Un podcast à soi',
    status: 'active' as const,
    description: {
      en: 'Intimate documentary podcast by Arte Radio exploring feminism and gender issues.',
      fr: 'Podcast documentaire intime d\'Arte Radio explorant le féminisme et les questions de genre.',
      de: 'Intimer Dokumentar-Podcast von Arte Radio über Feminismus und Geschlechterfragen.',
      es: 'Podcast documental íntimo de Arte Radio que explora el feminismo y las cuestiones de género.',
    },
  },
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function PodcastsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t.intro}</p>

        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.name}
              data-testid="podcast-card"
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{podcast.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                    podcast.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}
                >
                  {statusLabels[podcast.status][locale as Locale] ?? statusLabels[podcast.status].en}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {podcast.description[locale as Locale] ?? podcast.description.en}
              </p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
