import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/i18n/navigation';
import PageHeader from './components/PageHeader';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={t('not_found_title')} lede={t('not_found_message')} />
      <Link href="/" className="link-muted self-start text-[13px]">
        ← {t('nav.index')}
      </Link>
    </div>
  );
}
