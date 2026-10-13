import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import PageHeader from '../components/PageHeader';

const schools = [
  {id: '42-Paris', school: '42 Paris', yearsKey: 'education.years_01', titleKey: 'education.title_01', bodyKey: 'education.body_01', metaKey: 'education.meta_01'},
  {id: 'IAE-Lille', school: 'IAE Lille', yearsKey: 'education.years_02', titleKey: 'education.title_02', bodyKey: 'education.body_02', metaKey: 'education.meta_02'},
  {id: 'CPGE_BL', school: 'Notre Dame de la Paix', yearsKey: 'education.years_03', titleKey: 'education.title_03', bodyKey: 'education.body_03', metaKey: 'education.meta_03'},
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('education.title_meta')};
}

export default async function EducationPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title={t('nav.education')} lede={t('education.summary')} />

      <div>
        {schools.map((s) => (
          <Link
            key={s.id}
            href={`/education/${s.id}`}
            className="row grid-cols-[104px_minmax(0,1fr)_16px] py-[18px]"
          >
            <span className="font-mono text-[12px] text-ink-muted">{t(s.yearsKey)}</span>
            <span className="flex flex-col gap-1">
              <span className="font-medium">
                {t(s.titleKey)} <span className="font-normal text-ink-muted">· {s.school}</span>
              </span>
              <span className="text-pretty text-[14px] text-ink-soft">{t(s.bodyKey)}</span>
              <span className="font-mono text-[11px] text-ink-muted">{t(s.metaKey)}</span>
            </span>
            <span className="text-[13px] text-ink-muted" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
