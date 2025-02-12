import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale';
import { fr } from 'date-fns/locale';
import { de } from 'date-fns/locale';
import { es } from 'date-fns/locale';

export const Date = ({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}): JSX.Element => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, 'LLLL d, yyyy', { locale: locale === 'en' ? enUS : (locale === 'fr' ? fr : (locale === 'de' ? de : (locale === 'es' ? es : enUS)))})}
    </time>
  );
};

export default Date;