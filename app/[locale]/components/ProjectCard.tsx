type Project = {
  name: string;
  /** Repository name, shown in mono under the display name. */
  title?: string;
  /** Contributor stamp ("solo", "5 contrib"). Falls back to the raw count. */
  stamp?: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  stats: {contributors: number; lines: number; commits: number};
  image?: string;
};

type Labels = {live: string; lines: string; commits: string};

const DEFAULT_LABELS: Labels = {live: 'Live', lines: 'lines', commits: 'commits'};

export default function ProjectCard({project, labels = DEFAULT_LABELS}: {project: Project; labels?: Labels}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-rule transition-colors duration-[180ms] hover:border-ink-muted">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="aspect-video w-full border-b border-rule object-cover object-top"
          loading="lazy"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="flex flex-col leading-[1.35]">
            <h3 className="font-medium">{project.name}</h3>
            {project.title ? (
              <span className="font-mono text-[11px] text-ink-muted">{project.title}</span>
            ) : null}
          </span>
          <div className="flex shrink-0 gap-2.5 text-[12px]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="link-muted"
            >
              GitHub ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live site`}
                className="link-muted"
              >
                {labels.live} ↗
              </a>
            )}
          </div>
        </div>

        <p className="text-pretty text-[13px] leading-[1.55] text-ink-soft">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full bg-bg-alt px-2 py-px text-[11px] text-ink-soft">
              {t}
            </span>
          ))}
        </div>

        <div className="font-mono text-[11px] text-ink-muted">
          <span data-testid="stat-contributors">{project.stamp ?? project.stats.contributors}</span>
          {' · '}
          <span data-testid="stat-lines">
            {project.stats.lines.toLocaleString()} {labels.lines}
          </span>
          {' · '}
          <span data-testid="stat-commits">
            {project.stats.commits} {labels.commits}
          </span>
        </div>
      </div>
    </div>
  );
}
