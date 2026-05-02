import ExpandableCard from '../../components/ExpandableCard';

const content = {
  en: {
    title: 'Editions Denoël',
    summary: <p>Marketing Assistant at Editions Denoël (2015-2017) — brand identity, sales promotion, and business analysis.</p>,
    body: (
      <>
        <p>Marketing Assistant - <a href="http://www.denoel.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Editions Denoël</a> (2015 - 2017) - apprenticeship</p>
        <p className="mt-4">Missions:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Brand Identity (makeover supervision)</li>
          <li>Sales promotion (product launches &amp; stock valorisation)</li>
          <li>Business analysis (annual budget &amp; costs optimisation)</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'Editions Denoël',
    summary: <p>Assistant Marketing chez Editions Denoël (2015-2017) — identité de marque, promotion des ventes et analyse commerciale.</p>,
    body: (
      <>
        <p>Assistant Marketing - <a href="http://www.denoel.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Editions Denoël</a> (2015 - 2017) - apprentissage</p>
        <p className="mt-4">Missions :</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Identité de marque (supervision de la refondation)</li>
          <li>Promotion des ventes (lancements &amp; valorisation des stocks)</li>
          <li>Business analyse (budget annuel &amp; optimisation des coûts)</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'Editions Denoël',
    summary: <p>Marketingassistent bei Editions Denoël (2015-2017) — Markenidentität, Verkaufsförderung und Geschäftsanalyse.</p>,
    body: (
      <>
        <p>Marketingassistent - <a href="http://www.denoel.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Editions Denoël</a> (2015 - 2017) - Ausbildung</p>
        <p className="mt-4">Aufgaben:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Markenidentität (Überwachung der Umgestaltung)</li>
          <li>Verkaufsförderung (Produkteinführungen &amp; Aufwertung der Lagerbestände)</li>
          <li>Geschäftsanalyse (Jahresbudget &amp; Kostenoptimierung)</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'Editions Denoël',
    summary: <p>Asistente de marketing en Editions Denoël (2015-2017) — identidad de marca, promoción de ventas y análisis comercial.</p>,
    body: (
      <>
        <p>Asistente de marketing - <a href="http://www.denoel.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Editions Denoël</a> (2015 - 2017) - aprendizaje</p>
        <p className="mt-4">Misiones:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Identidad de marca (supervisión del cambio de imagen)</li>
          <li>Promoción de ventas (lanzamiento de productos y valorización de las existencias)</li>
          <li>Análisis comercial (presupuesto anual &amp; optimización de costes)</li>
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

export default async function EditionsDenoelPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2017-09-01</div>
        <ExpandableCard summary={t.summary}>
          <div className="prose">{t.body}</div>
        </ExpandableCard>
      </article>
    </>
  );
}
