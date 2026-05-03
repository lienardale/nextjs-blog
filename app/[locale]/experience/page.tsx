import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import SiteFooter from '../components/SiteFooter';

type Role = {
  id: string;
  idx: string;
  roleKey: string;
  companyKey: string;
  yearsKey: string;
  durationKey: string;
};

const roles: Role[] = [
  {id: 'Wiremind', idx: '01', roleKey: 'experience.role_01', companyKey: 'experience.company_01', yearsKey: 'experience.years_01', durationKey: 'experience.duration_01'},
  {id: 'Junior-42-Paris', idx: '02', roleKey: 'experience.role_02', companyKey: 'experience.company_02', yearsKey: 'experience.years_02', durationKey: 'experience.duration_02'},
  {id: 'ESF-Sciences-Humaines', idx: '03', roleKey: 'experience.role_03', companyKey: 'experience.company_03', yearsKey: 'experience.years_03', durationKey: 'experience.duration_03'},
  {id: 'Editions-Denoel', idx: '04', roleKey: 'experience.role_04', companyKey: 'experience.company_04', yearsKey: 'experience.years_04', durationKey: 'experience.duration_04'},
  {id: 'Flammarion', idx: '05', roleKey: 'experience.role_05', companyKey: 'experience.company_05', yearsKey: 'experience.years_05', durationKey: 'experience.duration_05'},
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('experience.title_meta')};
}

export default async function ExperiencePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <>
      <div className="section-page">
        <div className="crumbs">
          <Link href="/">{t('nav.index')}</Link> / <span>{t('nav.experience')}</span>
        </div>
        <div className="section-head">
          <div>
            <span className="kind">{t('experience.eyebrow')}</span>
            <h1 data-reveal dangerouslySetInnerHTML={{__html: t.raw('experience.title') as string}} />
          </div>
          <div className="kind">{t('experience.summary')}</div>
        </div>

        <div className="tech-bar" data-reveal>
          <div className="cell">
            <b>{t('experience.tech_latest')}</b>
            <span><span className="dot-live" />{t('experience.tech_latest_v')}</span>
          </div>
          <div className="cell">
            <b>{t('experience.tech_track')}</b>
            <span>{t('experience.tech_track_v')}</span>
          </div>
          <div className="cell">
            <b>{t('experience.tech_years')}</b>
            <span>{t('experience.tech_years_v')}</span>
          </div>
          <div className="cell">
            <b>{t('experience.tech_cities')}</b>
            <span>{t('experience.tech_cities_v')}</span>
          </div>
        </div>

        <div className="exp-list">
          {roles.map((r, i) => (
            <Link
              key={r.id}
              href={`/experience/${r.id}`}
              className="exp-row"
              data-reveal
              data-cursor="open"
              style={{['--d' as string]: i} as React.CSSProperties}
            >
              <span className="idx">{r.idx}</span>
              <div>
                <div
                  className="role"
                  dangerouslySetInnerHTML={{__html: t.raw(r.roleKey) as string}}
                />
              </div>
              <div
                className="company"
                dangerouslySetInnerHTML={{__html: t.raw(r.companyKey) as string}}
              />
              <div className="years">
                {t(r.yearsKey)}
                <br />
                <span style={{color: 'var(--ink-muted)'}}>{t(r.durationKey)}</span>
              </div>
              <div className="arrow">→</div>
            </Link>
          ))}
        </div>

        <SiteFooter rightLabel="01 / Experience" />
      </div>
    </>
  );
}
