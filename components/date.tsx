import { parseISO, format } from 'date-fns'
import enUS from 'date-fns/locale/en-US';
import fr from 'date-fns/locale/fr';
import de from 'date-fns/locale/de';
import es from 'date-fns/locale/es'

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