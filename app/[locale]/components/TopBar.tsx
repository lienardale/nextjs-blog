'use client';

import {Link, usePathname, useRouter} from '../../../lib/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import ParisClock from './ParisClock';
import ThemeToggle from './ThemeToggle';

const LOCALES = ['en', 'fr', 'de', 'es'] as const;

const NAV_ITEMS: {href: string; key: string; id: string}[] = [
  {href: '/', key: 'nav.home', id: 'home'},
  {href: '/experience', key: 'nav.experience', id: 'experience'},
  {href: '/education', key: 'nav.education', id: 'education'},
  {href: '/skills', key: 'nav.skills', id: 'skills'},
  {href: '/about_me', key: 'nav.hobbies', id: 'about_me'},
  {href: '/posts', key: 'nav.posts', id: 'posts'},
  {href: '/contact', key: 'nav.contact', id: 'contact'},
];

export default function TopBar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // The Hobbies section lives at /about_me but also owns /hobbies/*.
  const segment = pathname.split('/')[1] || 'home';
  const currentSection = segment === 'hobbies' ? 'about_me' : segment;

  return (
    <header className="site-column flex flex-col gap-4 pt-7">
      {/* The menu leads; "Home" stands in for a wordmark. */}
      <nav className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-[13px]">
        {NAV_ITEMS.map((item) => {
          const isCurrent = currentSection === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`transition-colors duration-[180ms] hover:text-ink ${
                isCurrent ? 'text-ink' : 'text-ink-muted'
              }`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-wrap items-center justify-between gap-x-[14px] gap-y-2">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
          <span className="size-[5px] rounded-full bg-accent" />
          <span>
            {t('location_city')} <ParisClock />
          </span>
        </span>
        <div className="flex items-center gap-[14px]">
          <div className="flex gap-0.5">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`px-[5px] py-0.5 font-mono text-[11px] transition-colors duration-[180ms] hover:text-ink ${
                  loc === locale ? 'text-ink' : 'text-ink-muted'
                }`}
                onClick={() => router.replace(pathname, {locale: loc})}
                aria-label={loc.toUpperCase()}
                aria-current={loc === locale ? 'true' : undefined}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
