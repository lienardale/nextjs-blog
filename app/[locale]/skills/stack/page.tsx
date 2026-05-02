import RadarChart from '../../components/RadarChart';
import SkillBar from '../../components/SkillBar';

const skills = [
  {name: 'TypeScript / JavaScript', level: 90},
  {name: 'ReactJS / NextJs', level: 85},
  {name: 'NodeJS / ExpressJS', level: 80},
  {name: 'C / C++', level: 75},
  {name: 'Postgres / MySQL', level: 70},
  {name: 'Docker / Kubernetes', level: 65},
  {name: 'Prisma / TypeOrm', level: 60},
  {name: 'Git / CI/CD', level: 85},
  {name: 'Bash', level: 70},
];

const content = {
  en: {title: 'Stack'},
  fr: {title: 'Stack'},
  de: {title: 'Stack'},
  es: {title: 'Stack'},
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function StackPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2022-05-12</div>
        <RadarChart skills={skills} />
        <h2 className="text-xl font-bold mt-8 mb-4">Proficiency</h2>
        <SkillBar skills={skills} />
      </article>
    </>
  );
}
