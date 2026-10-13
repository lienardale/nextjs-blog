const LINKS: {href: string; label: string}[] = [
  {href: 'https://github.com/lienardale', label: 'GitHub'},
  {href: 'https://www.linkedin.com/in/alienard/', label: 'LinkedIn'},
  {href: 'https://www.komoot.com/user/1617431265877', label: 'Komoot'},
  {href: 'mailto:alienard.dev@gmail.com', label: 'alienard.dev@gmail.com'},
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-column">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5 pb-10 text-[12px] text-ink-muted">
        <span>© {year} Alexandre Lienard</span>
        <div className="flex flex-wrap gap-4">
          {LINKS.map(({href, label}) => {
            const external = href.startsWith('http');
            return (
              <a
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener' : undefined}
                className="transition-colors duration-[180ms] hover:text-ink"
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
