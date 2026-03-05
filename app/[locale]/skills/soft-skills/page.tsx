import Header from '../../components/Header';

const content = {
  en: {
    title: 'Soft skills',
    body: (
      <ul className="space-y-2">
        <li><strong>Stakeholder Management</strong></li>
        <li><strong>Adaptability</strong></li>
        <li><strong>Project Management</strong></li>
        <li><strong>Crisis Management</strong></li>
      </ul>
    ),
  },
  fr: {
    title: 'Soft skills',
    body: (
      <ul className="space-y-2">
        <li><strong>Adaptabilité</strong></li>
        <li><strong>Gestion de projets</strong></li>
        <li><strong>Gestion d&apos;équipe</strong></li>
        <li><strong>Gestion de crise</strong></li>
      </ul>
    ),
  },
  de: {
    title: 'Soft skills',
    body: (
      <ul className="space-y-2">
        <li><strong>Anpassungsfähigkeit</strong></li>
        <li><strong>Projektmanagement</strong></li>
        <li><strong>Teammanagement</strong></li>
        <li><strong>Krisenmanagement</strong></li>
      </ul>
    ),
  },
  es: {
    title: 'Soft skills',
    body: (
      <ul className="space-y-2">
        <li><strong>Adaptabilidad</strong></li>
        <li><strong>Gestión de proyectos</strong></li>
        <li><strong>Gestión de equipos</strong></li>
        <li><strong>Gestión de crisis</strong></li>
      </ul>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function SoftSkillsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2022-05-12</div>
        <div className="prose">{t.body}</div>
      </article>
    </>
  );
}
