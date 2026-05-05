import {getTranslations} from 'next-intl/server';
import {getProjects} from '../../../../lib/registry';
import ProjectsList, {type ProjectsListItem, type ProjectsFilter} from '../../components/ProjectsList';

const pageTitle: Record<string, string> = {
  en: 'Projects',
  fr: 'Projets',
  de: 'Projekte',
  es: 'Proyectos',
};

const PROJECT_IMAGES: Record<string, string> = {
  bdi_2023: '/images/projects/bdi_2023.png',
  nextjs_blog: '/images/projects/nextjs_blog.png',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: pageTitle[locale] ?? pageTitle.en};
}

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const projects = getProjects(locale);

  const items: ProjectsListItem[] = projects.map((p) => ({
    id: p.id,
    date: p.date,
    name: p.name,
    description: p.description,
    github: p.github,
    live: p.live,
    tech: p.tech,
    tags: p.tags,
    stats: p.stats,
    image: PROJECT_IMAGES[p.id],
  }));

  const allTags = new Set(items.flatMap((p) => p.tags));
  const candidatePills: Array<{tag: string; label: string}> = [
    {tag: 'nextjs', label: 'Next.js'},
    {tag: 'typescript', label: 'TypeScript'},
    {tag: 'react', label: 'React'},
    {tag: 'c', label: 'C'},
    {tag: 'docker', label: 'Docker'},
    {tag: 'postgres', label: 'Postgres'},
  ];
  const filters: ProjectsFilter[] = [
    {tag: null, label: t('projects.filter_all')},
    ...candidatePills.filter((p) => allTags.has(p.tag)),
  ];

  return (
    <article>
      <h1 className="text-3xl font-extrabold tracking-tight my-4">
        {pageTitle[locale] ?? pageTitle.en}
      </h1>
      <ProjectsList items={items} filters={filters} />
    </article>
  );
}
