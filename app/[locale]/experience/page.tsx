import {getTranslations} from 'next-intl/server';
import {getSortedItems} from '../../../lib/registry';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import DurationBars from '../components/DurationBars';

const summaries: Record<string, Record<string, string>> = {
  'Junior-42-Paris': {
    en: 'Business Manager — managing a team of 12 Project Leaders and 4 Technical Experts.',
    fr: 'Business Manager — gestion d\'une équipe de 12 chefs de projets et 4 experts techniques.',
    de: 'Business Manager — Leitung eines Teams von 12 Projektleitern und 4 technischen Experten.',
    es: 'Gerente de negocio — gestión de un equipo de 12 líderes de proyecto y 4 expertos técnicos.',
  },
  'ESF-Sciences-Humaines': {
    en: 'Product Manager — business strategy, analysis, and digital marketing.',
    fr: 'Chef de produit — stratégie commerciale, analyse et marketing digital.',
    de: 'Produktmanager — Geschäftsstrategie, Analyse und digitales Marketing.',
    es: 'Gerente de producto — estrategia comercial, análisis y marketing digital.',
  },
  'Editions-Denoel': {
    en: 'Marketing Assistant — brand identity, sales promotion, and business analysis.',
    fr: 'Assistant marketing — identité de marque, promotion des ventes et analyse commerciale.',
    de: 'Marketing-Assistent — Markenidentität, Verkaufsförderung und Geschäftsanalyse.',
    es: 'Asistente de marketing — identidad de marca, promoción de ventas y análisis comercial.',
  },
  'Flammarion': {
    en: 'Press Relationships Assistant — database management and media research.',
    fr: 'Assistant relations presse — gestion de bases de données et veille médias.',
    de: 'Assistentin für Pressearbeit — Datenbankverwaltung und Medienforschung.',
    es: 'Asistente de relaciones con la prensa — gestión de bases de datos e investigación de medios.',
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('categ0')};
}

export default async function ExperienceOverviewPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const items = getSortedItems('experience', locale);

  const entries = items.map((item) => ({
    date: item.date,
    title: item.title,
    content: <p>{summaries[item.id]?.[locale] ?? summaries[item.id]?.en ?? ''}</p>,
    href: `/experience/${item.id}`,
  }));

  return (
    <>
      <Header />
      <h1 className="text-3xl font-extrabold tracking-tight my-4">{t('categ0')}</h1>
      <Timeline entries={entries} />
      <h2 className="text-xl font-bold mt-10 mb-4">{t('categ0')}</h2>
      <DurationBars
        items={items
          .filter((item) => item.startDate && item.endDate)
          .map((item) => ({title: item.title, startDate: item.startDate!, endDate: item.endDate!}))}
        color="blue"
      />
    </>
  );
}
