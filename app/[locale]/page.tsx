import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/i18n/navigation';
import ParisClock from './components/ParisClock';
import SiteFooter from './components/SiteFooter';

const sections = [
  {ix: '01 / Experience', href: '/experience', titleKey: 'home.idx_01_title', metaKey: 'home.idx_01_meta'},
  {ix: '02 / Education', href: '/education', titleKey: 'home.idx_02_title', metaKey: 'home.idx_02_meta'},
  {ix: '03 / Skills', href: '/skills', titleKey: 'home.idx_03_title', metaKey: 'home.idx_03_meta'},
  {ix: '04 / Infos', href: '/contact', titleKey: 'home.idx_04_title', metaKey: 'home.idx_04_meta'},
  {ix: '05 / Hobbies', href: '/about_me', titleKey: 'home.idx_05_title', metaKey: 'home.idx_05_meta'},
  {ix: '06 / Posts', href: '/posts', titleKey: 'home.idx_06_title', metaKey: 'home.idx_06_meta'},
];

const selected = [
  {num: '01', titleKey: 'home.sel_01_title', yrKey: 'home.sel_01_yr'},
  {num: '02', titleKey: 'home.sel_02_title', yrKey: 'home.sel_02_yr'},
  {num: '03', titleKey: 'home.sel_03_title', yrKey: 'home.sel_03_yr'},
  {num: '04', titleKey: 'home.sel_04_title', yrKey: 'home.sel_04_yr'},
];

const cursorMap: Record<string, string> = {
  '/experience': 'open',
  '/education': 'open',
  '/skills': 'open',
  '/about_me': 'open',
  '/contact': 'open',
  '/posts': 'read',
};

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div className="home-wrap">
      <div className="home-hero">
        <div className="eyebrow-row">
          <span className="l">alienard · portfolio</span>
          <span className="m">Paris · <ParisClock /></span>
        </div>
        <div className="home-title-row">
          <h1
            className="home-title"
            data-reveal
            dangerouslySetInnerHTML={{__html: t.raw('home.title') as string}}
          />
          <div className="home-aside" data-reveal style={{['--d' as string]: 2} as React.CSSProperties}>
            <div className="seal">{t('home.seal')}</div>
            <div>
              <p>{t('home.intro')}</p>
              <p>
                {t.rich('home.builtWith', {
                  link: (chunks) => (
                    <a href="https://github.com/lienardale/nextjs-blog" target="_blank" rel="noopener">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
        <p
          className="home-sub"
          data-reveal
          style={{['--d' as string]: 3} as React.CSSProperties}
          dangerouslySetInnerHTML={{__html: t.raw('home.sub') as string}}
        />
      </div>

      <nav className="home-index">
        {sections.map((s, i) => (
          <Link
            key={s.ix}
            href={s.href}
            data-cursor={cursorMap[s.href] ?? 'open'}
            data-reveal
            style={{['--d' as string]: i} as React.CSSProperties}
          >
            <div className="ix">{s.ix}</div>
            <h2
              className="name"
              dangerouslySetInnerHTML={{__html: t.raw(s.titleKey) as string}}
            />
            <div
              className="meta"
              dangerouslySetInnerHTML={{__html: t.raw(s.metaKey) as string}}
            />
            <div className="arrow">→</div>
          </Link>
        ))}
      </nav>

      <section className="selected">
        <div className="sel-head" data-reveal>
          <span className="eyebrow">{t('home.selected_eyebrow')}</span>
          <h2 dangerouslySetInnerHTML={{__html: t.raw('home.selected_title') as string}} />
          <p>{t('home.selected_lede')}</p>
          <Link className="btn ghost" href="/skills" data-cursor="all">
            {t('home.selected_cta')}
          </Link>
        </div>
        <div className="sel-list" data-reveal style={{['--d' as string]: 2} as React.CSSProperties}>
          {selected.map((s) => (
            <Link key={s.num} href="/skills" className="sel-item" data-cursor="open">
              <span className="num">{s.num}</span>
              <span
                className="ttl"
                dangerouslySetInnerHTML={{__html: t.raw(s.titleKey) as string}}
              />
              <span className="yr">{t(s.yrKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="now-playing">
        <div className="np">
          <span className="lb">{t('home.now_reading_lb')}</span>
          <span className="v" dangerouslySetInnerHTML={{__html: t.raw('home.now_reading_v') as string}} />
        </div>
        <div className="np">
          <span className="lb">{t('home.now_learning_lb')}</span>
          <span className="v" dangerouslySetInnerHTML={{__html: t.raw('home.now_learning_v') as string}} />
        </div>
        <div className="np">
          <span className="lb">{t('home.now_riding_lb')}</span>
          <span className="v" dangerouslySetInnerHTML={{__html: t.raw('home.now_riding_v') as string}} />
        </div>
        <div className="np">
          <span className="lb">{t('home.now_listening_lb')}</span>
          <span className="v" dangerouslySetInnerHTML={{__html: t.raw('home.now_listening_v') as string}} />
        </div>
      </div>

      <SiteFooter variant="home" />
    </div>
  );
}
