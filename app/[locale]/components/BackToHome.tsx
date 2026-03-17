'use client';

import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/i18n/navigation';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export default function BackToHome() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();

  // Hide on home page (/ or /fr or /de or /es)
  const isHome = pathname === '/' || pathname === `/${locale}`;
  if (isHome) return null;

  return (
    <div className="mt-12">
      <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-400">
        &larr; {t('back_home')}
      </Link>
    </div>
  );
}
