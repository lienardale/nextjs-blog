import Header from '../../components/Header';
import ExpandableCard from '../../components/ExpandableCard';

const content = {
  en: {
    title: 'Flammarion',
    summary: <p>Press Relationships Assistant at Flammarion (2015) — database management and media research.</p>,
    body: (
      <>
        <p>Press Relationships Assistant - <a href="https://editions.flammarion.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Flammarion</a> (2015) - internship</p>
        <p className="mt-4">Missions:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Database management: Eudonet and Data Press.</li>
          <li>Research and benchmark:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>monitoring of media practices and transformations</li>
              <li>study of digital influencers (identity, content, habits)</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'Flammarion',
    summary: <p>Assistant relations presse chez Flammarion (2015) — gestion de bases de données et veille médias.</p>,
    body: (
      <>
        <p>Assistant relations presse - <a href="https://editions.flammarion.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Flammarion</a> (2015) - stage</p>
        <p className="mt-4">Missions :</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Gestion des bases de données : Eudonet et Data Press.</li>
          <li>Recherche et benchmark :
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>veille sur les pratiques et les transformations des médias</li>
              <li>étude des influenceurs numériques (identité, contenu, habitudes)</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'Flammarion',
    summary: <p>Assistentin für Pressearbeit bei Flammarion (2015) — Datenbankverwaltung und Medienforschung.</p>,
    body: (
      <>
        <p>Assistentin für Pressearbeit - <a href="https://editions.flammarion.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Flammarion</a> (2015) - Praktikum</p>
        <p className="mt-4">Aufgaben:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Datenbankverwaltung: Eudonet und Data Press.</li>
          <li>Forschung und Benchmarking:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Beobachtung von Medienpraktiken und -veränderungen</li>
              <li>Untersuchung der digitalen Einflussnehmer (Identität, Inhalte, Gewohnheiten)</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'Flammarion',
    summary: <p>Asistente de relaciones con la prensa en Flammarion (2015) — gestión de bases de datos e investigación de medios.</p>,
    body: (
      <>
        <p>Asistente de relaciones con la prensa - <a href="https://editions.flammarion.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Flammarion</a> (2015) - prácticas</p>
        <p className="mt-4">Misiones:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Gestión de bases de datos: Eudonet y Data Press.</li>
          <li>Investigación y evaluación comparativa:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>seguimiento de las prácticas y transformaciones de los medios de comunicación</li>
              <li>estudio de los influenciadores digitales (identidad, contenido, hábitos)</li>
            </ul>
          </li>
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

export default async function FlammarionPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2015-09-01</div>
        <ExpandableCard summary={t.summary}>
          <div className="prose">{t.body}</div>
        </ExpandableCard>
      </article>
    </>
  );
}
