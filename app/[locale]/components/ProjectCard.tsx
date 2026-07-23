type Project = {
  name: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  stats: {contributors: number; lines: number; commits: number};
  image?: string;
};

export default function ProjectCard({project}: {project: Project}) {
  return (
    <div className="border border-rule rounded-lg p-5 transition-shadow duration-200 hover:shadow-lg">
      {project.image ? (
        <div className="-m-5 mb-3 overflow-hidden rounded-t-lg border-b border-rule">
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-lg">{project.name}</h3>
        <div className="flex gap-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="text-ink-muted hover:text-ink"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="text-ink-muted hover:text-accent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-ink-soft mb-3">{project.description}</p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="bg-bg-alt text-xs px-2 py-0.5 rounded-full text-ink-soft"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-ink-muted">
        <span data-testid="stat-contributors">
          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.stats.contributors}
        </span>
        <span data-testid="stat-lines">
          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {project.stats.lines.toLocaleString()} lines
        </span>
        <span data-testid="stat-commits">
          <svg className="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {project.stats.commits} commits
        </span>
      </div>
    </div>
  );
}
