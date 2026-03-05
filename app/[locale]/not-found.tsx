import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-bold mb-4">{t('not_found_title')}</h2>
      <p className="text-gray-600 mb-6">{t('not_found_message')}</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        {t('back_home')}
      </Link>
    </div>
  );
}
