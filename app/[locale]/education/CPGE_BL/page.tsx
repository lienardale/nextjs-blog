import {getTranslations} from 'next-intl/server';
import DetailPage from '../../components/DetailPage';

const content = {
  en: {
    title: 'CPGE BL',
    summary: <p>Preparatory class for the French Grandes Écoles at Notre Dame de la Paix, Lille — literature, philosophy, social sciences, and mathematics.</p>,
    body: (
      <>
        <p>Preparatory class for the French Grandes Écoles in Literature and Social Sciences.</p>
        <p>At <a href="https://www.ndplille.fr/cpge" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Notre Dame de la Paix</a>, Lille.</p>
        <p>(Hypokhâgne/Khâgne)</p>
        <p className="mt-4">Advanced courses:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Economics</li>
          <li>Sociology</li>
          <li>English</li>
          <li>History</li>
          <li>Geography</li>
          <li>Literature</li>
          <li>Mathematics</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'CPGE BL',
    summary: <p>Classe préparatoire aux Grandes Écoles à Notre Dame de la Paix, Lille — lettres, philosophie, sciences sociales et mathématiques.</p>,
    body: (
      <>
        <p>Classe préparatoire aux Grandes Écoles françaises de lettres et de sciences sociales.</p>
        <p>À <a href="https://www.ndplille.fr/cpge" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Notre Dame de la Paix</a>, Lille.</p>
        <p>(Hypokhâgne/Khâgne)</p>
        <p className="mt-4">Cours avancés :</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Économie</li>
          <li>Sociologie</li>
          <li>Anglais</li>
          <li>Histoire</li>
          <li>Géographie</li>
          <li>Littérature</li>
          <li>Mathématiques</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'CPGE BL',
    summary: <p>Vorbereitungsklasse für die Grandes Écoles an Notre Dame de la Paix, Lille — Literatur, Philosophie, Sozialwissenschaften und Mathematik.</p>,
    body: (
      <>
        <p>Vorbereitungsklasse für die französischen Grandes Écoles in Literatur und Sozialwissenschaften.</p>
        <p>In <a href="https://www.ndplille.fr/cpge" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Notre Dame de la Paix</a>, Lille.</p>
        <p>(Hypokhâgne/Khâgne)</p>
        <p className="mt-4">Fortgeschrittene Kurse:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Wirtschaft</li>
          <li>Soziologie</li>
          <li>Englisch</li>
          <li>Geschichte</li>
          <li>Geographie</li>
          <li>Literatur</li>
          <li>Mathematik</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'CPGE BL',
    summary: <p>Clase preparatoria para las Grandes Écoles en Notre Dame de la Paix, Lille — literatura, filosofía, ciencias sociales y matemáticas.</p>,
    body: (
      <>
        <p>Clase preparatoria para las Grandes Écoles francesas de Literatura y Ciencias Sociales.</p>
        <p>En <a href="https://www.ndplille.fr/cpge" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Notre Dame de la Paix</a>, Lille.</p>
        <p>(Hypokhâgne/Khâgne)</p>
        <p className="mt-4">Cursos de perfeccionamiento:</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Economía</li>
          <li>Sociología</li>
          <li>Inglés</li>
          <li>Historia</li>
          <li>Geografía</li>
          <li>Literatura</li>
          <li>Matemáticas</li>
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

export default async function CpgeBlPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  const tr = await getTranslations({locale});
  return (
    <DetailPage
      section="education"
      sectionLabel={tr('nav.education')}
      indexLabel={tr('nav.index')}
      eyebrow="// 2012 → 2014 · Lille"
      title={`${t.title}<em>.</em>`}
      meta="03 / Education"
      summary={t.summary}
      body={t.body}
      footerLabel="03 / Education"
    />
  );
}
