import { parseISO, format } from 'date-fns'
import enUS from 'date-fns/locale/en-US';
import fr from 'date-fns/locale/fr';

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
      {format(date, 'LLLL d, yyyy', { locale: locale === 'en-US' ? enUS : fr })}
    </time>
  );
};

export default Date;