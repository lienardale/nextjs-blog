import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import SiteFooter from '../components/SiteFooter';

const schools = [
  {id: '42-Paris', yearsKey: 'education.years_01', titleKey: 'education.title_01', bodyKey: 'education.body_01', metaKey: 'education.meta_01'},
  {id: 'IAE-Lille', yearsKey: 'education.years_02', titleKey: 'education.title_02', bodyKey: 'education.body_02', metaKey: 'education.meta_02'},
  {id: 'CPGE_BL', yearsKey: 'education.years_03', titleKey: 'education.title_03', bodyKey: 'education.body_03', metaKey: 'education.meta_03'},
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
    <div className="section-page narrow">
      <div className="crumbs">
        <Link href="/">{t('nav.index')}</Link> / <span>{t('nav.education')}</span>
      </div>
      <div className="section-head">
        <div>
          <span className="kind">{t('education.eyebrow')}</span>
          <h1 data-reveal dangerouslySetInnerHTML={{__html: t.raw('education.title') as string}} />
        </div>
        <div className="kind">{t('education.summary')}</div>
      </div>

      <div className="edu-list">
        {schools.map((s, i) => (
          <Link
            key={s.id}
            href={`/education/${s.id}`}
            className="edu-row"
            data-reveal
            data-cursor="open"
            style={{['--d' as string]: i} as React.CSSProperties}
          >
            <div className="yr">{t(s.yearsKey)}</div>
            <div>
              <h3 dangerouslySetInnerHTML={{__html: t.raw(s.titleKey) as string}} />
              <p>{t(s.bodyKey)}</p>
              <div className="meta">{t(s.metaKey)}</div>
            </div>
          </Link>
        ))}
      </div>

      <SiteFooter rightLabel="02 / Education" />
    </div>
  );
}
