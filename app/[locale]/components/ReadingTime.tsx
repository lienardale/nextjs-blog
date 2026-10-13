import {useTranslations} from 'next-intl';

export default function ReadingTime({minutes}: {minutes: number}) {
  const t = useTranslations();

  return <span>{t('reading_time', {minutes})}</span>;
}
