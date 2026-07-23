import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-bold mb-4">{t('not_found_title')}</h2>
      <p className="text-ink-soft mb-6">{t('not_found_message')}</p>
      <Link href="/" className="px-4 py-2 bg-accent text-accent-fg rounded-md hover:opacity-90 transition-colors">
        {t('back_home')}
      </Link>
    </div>
  );
}
