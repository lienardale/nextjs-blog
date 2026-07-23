import {useTranslations} from 'next-intl';
import {ClockIcon} from '@heroicons/react/24/outline';

export default function ReadingTime({minutes}: {minutes: number}) {
  const t = useTranslations();

  return (
    <span className="inline-flex items-center gap-1 text-ink-muted text-sm">
      <ClockIcon className="h-4 w-4" />
      {t('reading_time', {minutes})}
    </span>
  );
}
