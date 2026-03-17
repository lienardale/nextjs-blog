import Header from '../../components/Header';
import WorldMap from '../../components/WorldMap';

const content = {
  en: {
    title: 'Languages',
    languages: [
      {name: 'French', level: 'native', color: '#3b82f6', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'English', level: 'fluent', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  fr: {
    title: 'Langues',
    languages: [
      {name: 'Français', level: 'natif', color: '#3b82f6', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'Anglais', level: 'courant', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  de: {
    title: 'Sprachen',
    languages: [
      {name: 'Französisch', level: 'Muttersprache', color: '#3b82f6', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'Englisch', level: 'fließend', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  es: {
    title: 'Idiomas',
    languages: [
      {name: 'Francés', level: 'nativo', color: '#3b82f6', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'Inglés', level: 'fluido', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
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
        <WorldMap languages={[...t.languages]} />
      </article>
    </>
  );
}
