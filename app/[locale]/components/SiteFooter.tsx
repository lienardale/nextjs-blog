import {Link} from '../../../lib/i18n/navigation';

type Variant = 'home' | 'section';

export default function SiteFooter({
  variant = 'section',
  rightLabel,
}: {
  variant?: Variant;
  rightLabel?: string;
}) {
  const year = new Date().getFullYear();

  if (variant === 'home') {
    return (
      <footer className="site-footer">
        <div className="wordmark">alienard<em>.</em></div>
        <div className="l">© {year} · Alexandre Lienard</div>
        <div className="social">
          <a href="https://github.com/lienardale" target="_blank" rel="noopener" data-cursor="github">GitHub</a>
          <a href="https://www.linkedin.com/in/alienard/" target="_blank" rel="noopener" data-cursor="linkedin">LinkedIn</a>
          <a href="https://www.komoot.com/user/1617431265877" target="_blank" rel="noopener" data-cursor="komoot">Komoot</a>
          <a href="mailto:alienard.dev@gmail.com" data-cursor="email">alienard.dev@gmail.com</a>
        </div>
        <div className="r">EN · FR · DE · ES</div>
      </footer>
    );
  }

  return (
    <footer className="site-footer" style={{marginTop: 80}}>
      <div className="l">© {year}</div>
      <div className="social">
        <Link href="/" data-cursor="back">← back to index</Link>
      </div>
      <div className="r">{rightLabel ?? ''}</div>
    </footer>
  );
}
