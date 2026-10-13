import {getTranslations} from 'next-intl/server';
import HardSkills from '../../components/HardSkills';
import SkillsHeader from '../../components/SkillsHeader';

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
  const t = await getTranslations({locale});

  return (
    <div className="flex flex-col gap-8">
      <SkillsHeader active="stack" t={t} />
      <div className="pt-2">
        <HardSkills skills={skills} variant="compact" rowsLabel={t('skills.stack_label')} />
      </div>
    </div>
  );
}
