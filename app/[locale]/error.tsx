'use client';

import {useTranslations} from 'next-intl';

export default function Error({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-2xl font-bold mb-4">{t('error_title')}</h2>
      <p className="text-gray-600 mb-6">{t('error_message')}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {t('error_retry')}
      </button>
    </div>
  );
}
