import {getTranslations} from 'next-intl/server';
import {getSortedItems} from '../../../lib/registry';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import DurationBars from '../components/DurationBars';

const summaries: Record<string, Record<string, string>> = {
  '42-Paris': {
    en: 'Software engineering school — peer-to-peer learning, C, algorithms, and system programming.',
    fr: 'École d\'ingénierie logicielle — apprentissage par les pairs, C, algorithmes et programmation système.',
    de: 'Softwaretechnik-Schule — Peer-to-Peer-Lernen, C, Algorithmen und Systemprogrammierung.',
    es: 'Escuela de ingeniería de software — aprendizaje entre pares, C, algoritmos y programación de sistemas.',
  },
  'IAE-Lille': {
    en: 'Masters in International Marketing & Communication — business strategy and digital marketing.',
    fr: 'Master en Marketing International & Communication — stratégie commerciale et marketing digital.',
    de: 'Master in Internationalem Marketing & Kommunikation — Geschäftsstrategie und digitales Marketing.',
    es: 'Máster en Marketing Internacional y Comunicación — estrategia comercial y marketing digital.',
  },
  'CPGE_BL': {
    en: 'Preparatory class for Grandes Écoles — literature, philosophy, social sciences, and mathematics.',
    fr: 'Classe préparatoire aux Grandes Écoles — lettres, philosophie, sciences sociales et mathématiques.',
    de: 'Vorbereitungsklasse für Grandes Écoles — Literatur, Philosophie, Sozialwissenschaften und Mathematik.',
    es: 'Clase preparatoria para Grandes Écoles — literatura, filosofía, ciencias sociales y matemáticas.',
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('categ1')};
}

export default async function EducationOverviewPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const items = getSortedItems('education', locale);

  const entries = items.map((item) => ({
    date: item.date,
    title: item.title,
    content: <p>{summaries[item.id]?.[locale] ?? summaries[item.id]?.en ?? ''}</p>,
    href: `/education/${item.id}`,
  }));

  return (
    <>
      <Header />
      <h1 className="text-3xl font-extrabold tracking-tight my-4">{t('categ1')}</h1>
      <Timeline entries={entries} />
      <h2 className="text-xl font-bold mt-10 mb-4">{t('categ1')}</h2>
      <DurationBars
        items={items
          .filter((item) => item.startDate && item.endDate)
          .map((item) => ({title: item.title, startDate: item.startDate!, endDate: item.endDate!}))}
        color="green"
      />
    </>
  );
}
