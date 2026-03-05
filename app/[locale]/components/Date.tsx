import {parseISO, format, type Locale} from 'date-fns';
import {enUS, fr, de, es} from 'date-fns/locale';

const localeMap: Record<string, Locale> = {en: enUS, fr, de, es};

export default function Date({dateString, locale = 'en'}: {dateString: string; locale?: string}) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL d, yyyy', {locale: localeMap[locale] ?? enUS})}
    </time>
  );
}
