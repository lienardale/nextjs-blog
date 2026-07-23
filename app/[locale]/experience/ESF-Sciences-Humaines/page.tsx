import {getTranslations} from 'next-intl/server';
import DetailPage from '../../components/DetailPage';

const content = {
  en: {
    title: 'ESF Sciences Humaines',
    summary: <p>Product Manager at ESF Sciences Humaines (2018-2019) — business strategy, analysis, and digital marketing.</p>,
    body: (
      <>
        <p>Product Manager - <a href="https://www.esf-scienceshumaines.fr/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">ESF Sciences Humaines</a> (2018 - 2019)</p>
        <p className="mt-4">Missions:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Business Strategy (diversify acquisition sources)</li>
          <li>Business Analysis (value chain analysis &amp; optimisation)</li>
          <li>Digital Marketing (increase traffic &amp; conversion)</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'ESF Sciences Humaines',
    summary: <p>Chef de produit chez ESF Sciences Humaines (2018-2019) — stratégie commerciale, analyse et marketing digital.</p>,
    body: (
      <>
        <p>Chef de produit - <a href="https://www.esf-scienceshumaines.fr/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">ESF Sciences Humaines</a> (2018 - 2019)</p>
        <p className="mt-4">Missions :</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Stratégie commerciale (diversifier les sources d&apos;acquisition)</li>
          <li>Analyse commerciale (analyse et optimisation de la chaîne de valeur)</li>
          <li>Marketing digital (augmenter le trafic et la conversion)</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'ESF Sciences Humaines',
    summary: <p>Produktmanager bei ESF Sciences Humaines (2018-2019) — Geschäftsstrategie, Analyse und digitales Marketing.</p>,
    body: (
      <>
        <p>Produktmanager - <a href="https://www.esf-scienceshumaines.fr/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">ESF Sciences Humaines</a> (2018 - 2019)</p>
        <p className="mt-4">Aufgaben:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Geschäftsstrategie (Diversifizierung der Erwerbsquellen)</li>
          <li>Geschäftsanalyse (Analyse und Optimierung der Wertschöpfungskette)</li>
          <li>Digitales Marketing (Traffic &amp; Konversion steigern)</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'ESF Sciences Humaines',
    summary: <p>Gerente de producto en ESF Sciences Humaines (2018-2019) — estrategia comercial, análisis y marketing digital.</p>,
    body: (
      <>
        <p>Responsable de producto - <a href="https://www.esf-scienceshumaines.fr/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">ESF Sciences Humaines</a> (2018 - 2019)</p>
        <p className="mt-4">Misiones:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Estrategia comercial (diversificar las fuentes de adquisición)</li>
          <li>Análisis del negocio (análisis y optimización de la cadena de valor)</li>
          <li>Marketing digital (aumentar el tráfico y la conversión)</li>
        </ul>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function EsfPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  const tr = await getTranslations({locale});
  return (
    <DetailPage
      section="experience"
      sectionLabel={tr('nav.experience')}
      indexLabel={tr('nav.index')}
      eyebrow="// 2018 → 2019 · Paris"
      title={`${t.title}<em>.</em>`}
      meta="03 / Experience"
      summary={t.summary}
      body={t.body}
      footerLabel="03 / Experience"
    />
  );
}
