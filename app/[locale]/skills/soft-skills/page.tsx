import Header from '../../components/Header';
import FlipCard from '../../components/FlipCard';

const skills = [
  {
    id: 'stakeholder',
    icon: (
      <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    id: 'adaptability',
    icon: (
      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    id: 'project_mgmt',
    icon: (
      <svg className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    id: 'crisis',
    icon: (
      <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const skillNames: Record<string, Record<string, string>> = {
  stakeholder: {
    en: 'Stakeholder Management',
    fr: 'Gestion des parties prenantes',
    de: 'Stakeholder-Management',
    es: 'Gestión de interesados',
  },
  adaptability: {
    en: 'Adaptability',
    fr: 'Adaptabilité',
    de: 'Anpassungsfähigkeit',
    es: 'Adaptabilidad',
  },
  project_mgmt: {
    en: 'Project Management',
    fr: 'Gestion de projets',
    de: 'Projektmanagement',
    es: 'Gestión de proyectos',
  },
  crisis: {
    en: 'Crisis Management',
    fr: 'Gestion de crise',
    de: 'Krisenmanagement',
    es: 'Gestión de crisis',
  },
};

const skillDescriptions: Record<string, Record<string, string>> = {
  stakeholder: {
    en: 'Building trust with clients, partners, and teams through clear communication and alignment.',
    fr: 'Construire la confiance avec les clients, partenaires et équipes par une communication claire.',
    de: 'Vertrauen aufbauen mit Kunden, Partnern und Teams durch klare Kommunikation.',
    es: 'Generar confianza con clientes, socios y equipos mediante una comunicación clara.',
  },
  adaptability: {
    en: 'Thriving in fast-changing environments, quickly learning new technologies and adapting to new challenges.',
    fr: 'S\'épanouir dans des environnements changeants, apprendre rapidement de nouvelles technologies.',
    de: 'In schnelllebigen Umgebungen aufblühen und neue Technologien schnell erlernen.',
    es: 'Prosperar en entornos cambiantes, aprendiendo rápidamente nuevas tecnologías.',
  },
  project_mgmt: {
    en: 'Planning, executing, and delivering projects on time with agile methodologies.',
    fr: 'Planifier, exécuter et livrer des projets dans les délais avec des méthodologies agiles.',
    de: 'Projekte planen, durchführen und termingerecht mit agilen Methoden liefern.',
    es: 'Planificar, ejecutar y entregar proyectos a tiempo con metodologías ágiles.',
  },
  crisis: {
    en: 'Staying calm under pressure, identifying root causes, and implementing rapid solutions.',
    fr: 'Garder son calme sous pression, identifier les causes et mettre en œuvre des solutions rapides.',
    de: 'Unter Druck ruhig bleiben, Ursachen identifizieren und schnelle Lösungen umsetzen.',
    es: 'Mantener la calma bajo presión, identificar causas raíz e implementar soluciones rápidas.',
  },
};

const pageTitle: Record<string, string> = {
  en: 'Soft Skills',
  fr: 'Soft Skills',
  de: 'Soft Skills',
  es: 'Soft Skills',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: pageTitle[locale] ?? pageTitle.en};
}

export default async function SoftSkillsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">
          {pageTitle[locale] ?? pageTitle.en}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <FlipCard
              key={skill.id}
              front={
                <div className="flex flex-col items-center gap-3 text-center">
                  {skill.icon}
                  <span className="font-semibold text-sm">
                    {skillNames[skill.id]?.[locale] ?? skillNames[skill.id]?.en}
                  </span>
                </div>
              }
              back={
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                  {skillDescriptions[skill.id]?.[locale] ?? skillDescriptions[skill.id]?.en}
                </p>
              }
            />
          ))}
        </div>
      </article>
    </>
  );
}
