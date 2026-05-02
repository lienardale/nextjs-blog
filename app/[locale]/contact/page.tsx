import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import SiteFooter from '../components/SiteFooter';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('contact.title_meta')};
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div className="about-stage">
      <div className="crumbs">
        <Link href="/">{t('nav.index')}</Link> / <span>{t('nav.contact')}</span>
      </div>

      <div className="contact" id="contact">
        <div data-reveal>
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{__html: t.raw('contact.title') as string}} />
          <p>{t('contact.lede')}</p>
        </div>
        <div className="channels" data-reveal style={{['--d' as string]: 1} as React.CSSProperties}>
          <a className="ch ch-primary" href="mailto:alienard.dev@gmail.com" data-cursor="email">
            <span className="lb">{t('contact.email_lb')}</span>
            <span className="v">alienard.dev<em>@gmail.com</em></span>
            <span className="arr">→</span>
          </a>
          <div className="ch-row">
            <a className="ch ch-mini" href="https://www.linkedin.com/in/alienard/" target="_blank" rel="noopener" data-cursor="linkedin">
              <span className="lb">LinkedIn</span>
              <span className="v">/in/<em>alienard</em></span>
            </a>
            <a className="ch ch-mini" href="https://github.com/lienardale" target="_blank" rel="noopener" data-cursor="github">
              <span className="lb">GitHub</span>
              <span className="v">/<em>lienardale</em></span>
            </a>
            <a className="ch ch-mini" href="https://lienardale.github.io/markdown-cv/" target="_blank" rel="noopener" data-cursor="open">
              <span className="lb">{t('contact.cv_lb')}</span>
              <span className="v"><em>markdown-cv</em></span>
            </a>
            <a className="ch ch-mini" href="https://www.komoot.com/user/1617431265877" target="_blank" rel="noopener" data-cursor="open">
              <span className="lb">Komoot</span>
              <span className="v">user/<em>1617431265877</em></span>
            </a>
          </div>
        </div>
      </div>

      <SiteFooter rightLabel="06 / Contact" />
    </div>
  );
}
