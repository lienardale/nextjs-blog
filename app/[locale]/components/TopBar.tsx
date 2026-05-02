'use client';

import {Link, usePathname, useRouter} from '../../../lib/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import ParisClock from './ParisClock';

const LOCALES = ['en', 'fr', 'de', 'es'] as const;

export default function TopBar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentSection = pathname === '/' ? 'home' : pathname.split('/')[1] ?? 'home';

  const navItems: {href: string; key: string; id: string}[] = [
    {href: '/', key: 'nav.index', id: 'home'},
    {href: '/experience', key: 'nav.experience', id: 'experience'},
    {href: '/education', key: 'nav.education', id: 'education'},
    {href: '/skills', key: 'nav.skills', id: 'skills'},
    {href: '/about_me', key: 'nav.hobbies', id: 'about_me'},
    {href: '/posts', key: 'nav.posts', id: 'posts'},
    {href: '/contact', key: 'nav.contact', id: 'contact'},
  ];

  return (
    <header className="topbar">
      <Link href="/" className="brand" data-cursor="home">
        <span className="mark">AL</span>
        <span>alienard</span>
      </Link>
      <nav className="nav">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={currentSection === item.id ? 'page' : undefined}
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="meta">
        <span><span className="dot" />Paris</span>
        <span><ParisClock /></span>
      </div>
      <div className="lang">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            type="button"
            className={loc === locale ? 'is-active' : ''}
            onClick={() => router.replace(pathname, {locale: loc})}
            data-cursor={loc.toUpperCase()}
            aria-label={loc.toUpperCase()}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
