import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import {getSortedItems} from '../../../lib/registry';
import PageHeader from '../components/PageHeader';

type Role = {
  id: string;
  roleKey: string;
  companyKey: string;
  yearsKey: string;
  durationKey: string;
};

const roles: Role[] = [
  {id: 'Wiremind', roleKey: 'experience.role_01', companyKey: 'experience.company_01', yearsKey: 'experience.years_01', durationKey: 'experience.duration_01'},
  {id: 'Junior-42-Paris', roleKey: 'experience.role_02', companyKey: 'experience.company_02', yearsKey: 'experience.years_02', durationKey: 'experience.duration_02'},
  {id: 'ESF-Sciences-Humaines', roleKey: 'experience.role_03', companyKey: 'experience.company_03', yearsKey: 'experience.years_03', durationKey: 'experience.duration_03'},
  {id: 'Editions-Denoel', roleKey: 'experience.role_04', companyKey: 'experience.company_04', yearsKey: 'experience.years_04', durationKey: 'experience.duration_04'},
  {id: 'Flammarion', roleKey: 'experience.role_05', companyKey: 'experience.company_05', yearsKey: 'experience.years_05', durationKey: 'experience.duration_05'},
];

const META = ['latest', 'track', 'years', 'cities'];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('experience.title_meta')};
}

export default async function ExperiencePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const companyNames = new Map(getSortedItems('experience', locale).map((item) => [item.id, item.title]));

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title={t('nav.experience')} lede={t('experience.summary')} />

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-4 gap-y-3">
        {META.map((cell) => (
          <div key={cell} className="flex flex-col gap-0.5">
            <dt className="section-label text-[10px]">{t(`experience.tech_${cell}`)}</dt>
            <dd className="text-[13px]">{t(`experience.tech_${cell}_v`)}</dd>
          </div>
        ))}
      </dl>

      <div>
        {roles.map((r) => (
          <Link
            key={r.id}
            href={`/experience/${r.id}`}
            className="row grid-cols-[104px_minmax(0,1fr)_16px] py-[18px]"
          >
            <span className="flex flex-col font-mono text-[12px] leading-[1.5] text-ink-muted">
              <span>{t(r.yearsKey)}</span>
              <span>{t(r.durationKey)}</span>
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-medium">
                {t(r.roleKey)} <span className="font-normal text-ink-muted">· {companyNames.get(r.id)}</span>
              </span>
              <span className="text-pretty text-[14px] text-ink-soft">{t(r.companyKey)}</span>
            </span>
            <span className="text-[13px] text-ink-muted" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
