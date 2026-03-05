import Header from '../../components/Header';

const content = {
  en: {
    title: 'Languages',
    items: [
      {lang: 'French', level: 'native'},
      {lang: 'English', level: 'fluent'},
    ],
  },
  fr: {
    title: 'Langues',
    items: [
      {lang: 'Français', level: 'natif'},
      {lang: 'Anglais', level: 'courant'},
    ],
  },
  de: {
    title: 'Sprachen',
    items: [
      {lang: 'Französisch', level: 'Muttersprache'},
      {lang: 'Englisch', level: 'fließend'},
    ],
  },
  es: {
    title: 'Idiomas',
    items: [
      {lang: 'Francés', level: 'nativo'},
      {lang: 'Inglés', level: 'fluido'},
    ],
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function LanguagesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2022-05-12</div>
        <div className="space-y-2">
          {t.items.map(({lang, level}) => (
            <p key={lang}>
              <strong>{lang}</strong> : {level}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
