'use client';

import {useTranslations} from 'next-intl';
import PageHeader from './components/PageHeader';

export default function Error({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={t('error_title')} lede={t('error_message')} />
      <button type="button" onClick={reset} className="link-muted self-start text-[13px]">
        {t('error_retry')}
      </button>
    </div>
  );
}
