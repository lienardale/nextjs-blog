import {getTranslations} from 'next-intl/server';
import AboutHeader from '../../components/AboutHeader';
import WorldMap from '../../components/WorldMap';

const content = {
  en: {
    title: 'Languages',
    languages: [
      {name: 'French', level: 'native', color: 'var(--accent)', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'English', level: 'fluent', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  fr: {
    title: 'Langues',
    languages: [
      {name: 'Français', level: 'natif', color: 'var(--accent)', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'Anglais', level: 'courant', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  de: {
    title: 'Sprachen',
    languages: [
      {name: 'Französisch', level: 'Muttersprache', color: 'var(--accent)', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
      {name: 'Englisch', level: 'fließend', color: '#22c55e', countries: ['uk', 'usa', 'canada', 'australia', 'india', 'south_africa']},
    ],
  },
  es: {
    title: 'Idiomas',
    languages: [
      {name: 'Francés', level: 'nativo', color: 'var(--accent)', countries: ['france', 'belgium', 'canada', 'congo', 'cameroon']},
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
  const tr = await getTranslations({locale});

  return (
    <div className="flex flex-col gap-8">
      <AboutHeader active="languages" t={tr} />
      <div className="pt-2">
        <WorldMap languages={[...t.languages]} />
      </div>
    </div>
  );
}
