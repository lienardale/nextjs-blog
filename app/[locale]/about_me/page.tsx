import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import Scrapbook from '../components/Scrapbook';
import SiteFooter from '../components/SiteFooter';
import TripExpand, {type Trip} from '../components/TripExpand';

const interactiveTrips: Trip[] = [
  {id: '2281343685', yearLabel: '2025', name: 'Paris → <em>Saint-Quentin</em> (2/2)', km: '59', days: '0.3', year: '2025'},
  {id: '2279371256', yearLabel: '2025', name: 'Paris → <em>Saint-Quentin</em> (1/2)', km: '127', days: '0.7', year: '2025'},
  {id: '2155477868', yearLabel: '2025', name: 'Paris → <em>Roubaix.</em>', km: '71', days: '1', year: '2025'},
  {id: '1830962536', yearLabel: '2024', name: 'Angers → <em>Mesquer.</em>', km: '199', days: '1', year: '2024'},
  {id: '1623219446', yearLabel: '2024', name: 'Hourtin → <em>Arcachon.</em>', km: '80', days: '1', year: '2024'},
  {id: '1567077210', yearLabel: '2024', name: 'Naxos <em>Loop.</em>', km: '55', days: '1', year: '2024'},
  {id: '1256629528', yearLabel: '2023', name: 'Paris → <em>Tours.</em>', km: '362', days: '3', year: '2023'},
  {id: '1073152740', yearLabel: '2023', name: 'Paris → <em>Roubaix.</em>', km: '147', days: '1', year: '2023'},
  {id: '449141002', yearLabel: '2021', name: 'Nantes → <em>Bordeaux.</em>', km: '600', days: '6', year: '2021'},
  {id: '439307756', yearLabel: '2021', name: 'Quimper → <em>Vannes.</em>', km: '300', days: '6', year: '2021'},
];

const staticTrips = [
  {
    yearLabel: '2020',
    name: 'Chartres → <em>Tours.</em>',
    km: '300',
    days: '4',
    year: '2020',
    pathD: 'M30 25 L 80 40 L 110 55 L 175 80',
  },
  {
    yearLabel: '2019',
    name: 'La Panne → <em>Lille.</em>',
    km: '100',
    days: '1',
    year: '2019',
    pathD: 'M25 25 L 50 35 L 75 40 L 110 60 L 175 80',
  },
  {
    yearLabel: '2017',
    name: 'Lille → <em>Amsterdam</em> → Lille.',
    km: '600',
    days: '8',
    year: '2017',
    pathD: 'M30 70 Q 80 20 130 30 Q 160 40 130 60 Q 80 80 30 70',
  },
];

const novels = [
  {title: 'Asterios Polyp', author: 'D. Mazzucchelli', genre: 'Literary', c1: '#6b1f3a', c2: '#a14464', cover_url: '/covers/asterios-polyp.jpg'},
  {title: 'Maus', author: 'Art Spiegelman', genre: 'Memoir', c1: '#2a2a2a', c2: '#5a5a5a', cover_url: '/covers/maus.jpg'},
  {title: 'Persepolis', author: 'Marjane Satrapi', genre: 'Autobio', c1: '#1a3a4a', c2: '#3d6c84', cover_url: '/covers/persepolis.jpg'},
  {title: 'Blankets', author: 'Craig Thompson', genre: 'Memoir', c1: '#3a2a14', c2: '#7a5a32', cover_url: '/covers/blankets.jpg'},
  {title: 'Le Sommet des Dieux', author: 'J. Taniguchi', genre: 'Adventure', c1: '#3a4a52', c2: '#7088a0', cover_url: '/covers/le-sommet-des-dieux.jpg'},
  {title: 'Akira', author: 'K. Otomo', genre: 'Sci-Fi', c1: '#a02818', c2: '#e85c1a', cover_url: '/covers/akira.jpg'},
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('about.title_meta')};
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div className="about-stage">
      <div className="crumbs">
        <Link href="/">{t('nav.index')}</Link> / <span>{t('about.crumb')}</span>
      </div>
      <h1
        className="about-title"
        data-reveal
        dangerouslySetInnerHTML={{__html: t.raw('about.title') as string}}
      />
      <p
        className="about-intro"
        data-reveal
        style={{['--d' as string]: 1} as React.CSSProperties}
        dangerouslySetInnerHTML={{__html: t.raw('about.intro') as string}}
      />

      <Scrapbook
        stickers={[
          {
            className: 'photo',
            rot: '-6deg',
            x: 40,
            y: 30,
            children: (
              <>
                <Image src="/images/profile.jpg" alt="Alexandre Lienard" width={240} height={300} />
                <span className="cap">profile</span>
              </>
            ),
          },
          {
            className: 'sticker',
            rot: '12deg',
            x: 330,
            y: 50,
            children: (
              <>cycling<br />enjoyer</>
            ),
          },
          {
            className: 'fact',
            rot: '-3deg',
            x: 530,
            y: 20,
            children: (
              <>
                <span className="label">Languages</span>
                <div className="big"><em>FR</em> native · <em>EN</em> fluent</div>
              </>
            ),
          },
          {
            className: 'note',
            rot: '4deg',
            x: 110,
            y: 350,
            children: (
              <>
                <span className="label" style={{color: '#6d5d0a'}}>Post-it</span>
                <div className="big">marketing<br />+ product<br />+ code.</div>
              </>
            ),
          },
          {
            className: 'tape',
            rot: '-2deg',
            x: 440,
            y: 290,
            children: (
              <>
                <span className="label">Riding log</span>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.05em', lineHeight: 1.55, marginTop: 4}}>
                  10 trips logged<br />
                  ~2,723 km total<br />
                  32 days on the road
                </div>
              </>
            ),
          },
          {
            className: 'stamp',
            rot: '6deg',
            x: 810,
            y: 280,
            children: (
              <>
                <span className="label" style={{color: 'var(--accent)'}}>Bikes</span>
                <div className="big">single-speed<br />Motobecane<br />+ Kona Rove</div>
              </>
            ),
          },
          {
            className: 'fact',
            rot: '2deg',
            x: 820,
            y: 80,
            children: (
              <>
                <span className="label">Contact</span>
                <div className="big" style={{fontSize: 18}}>alienard.dev<br />@<em>gmail.com</em></div>
              </>
            ),
          },
        ]}
      />

      <div className="hobby-ribbon" id="hobbies" aria-hidden>
        <div className="track">
          {Array.from({length: 3}).map((_, i) => (
            <span key={i} style={{display: 'inline-flex', gap: 32}}>
              <span>biking</span><span className="dot">●</span>
              <span><em>graphic novels</em></span><span className="dot">●</span>
              <span>podcasts</span><span className="dot">●</span>
              <span><em>languages</em></span><span className="dot">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="trips-block">
        <div className="trips-head">
          <div>
            <span className="eyebrow">{t('about.trips_eyebrow')}</span>
            <h2
              className="trips-title"
              dangerouslySetInnerHTML={{__html: t.raw('about.trips_title') as string}}
            />
          </div>
          <div className="trips-meta">
            <div><b>10</b><span>{t('about.trips_label_trips')}</span></div>
            <div><b>2,723</b><span>{t('about.trips_label_km')}</span></div>
            <div><b>32</b><span>{t('about.trips_label_days')}</span></div>
            <a
              className="komoot-link"
              href="https://www.komoot.com/user/1617431265877"
              target="_blank"
              rel="noopener"
              data-cursor="open"
            >
              <span>{t('about.komoot_full_log')}</span>
              <em>Komoot ↗</em>
            </a>
          </div>
        </div>
        <div className="trip-log">
          {interactiveTrips.map((trip, i) => (
            <TripExpand key={trip.id} trip={trip} delay={i % 3} />
          ))}
          {staticTrips.map((trip, i) => (
            <div
              key={trip.year + trip.name}
              className="trip is-static"
              data-reveal
              style={{['--d' as string]: i} as React.CSSProperties}
            >
              <div className="t-head">
                <span>Trip / {trip.yearLabel}</span>
                <span className="komoot-tag muted">Map</span>
              </div>
              <div className="t-name" dangerouslySetInnerHTML={{__html: trip.name}} />
              <div className="map">
                <svg viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d={trip.pathD} fill="none" stroke="currentColor" strokeWidth="2" style={{color: 'var(--accent)'}} />
                  <circle cx="30" cy="25" r="3" fill="currentColor" style={{color: 'var(--ink)'}} />
                  <circle cx="175" cy="80" r="3" fill="currentColor" style={{color: 'var(--accent)'}} />
                </svg>
              </div>
              <div className="t-stats">
                <div><b>{trip.km}</b>km</div>
                <div><b>{trip.days}</b>{trip.days === '1' ? 'day' : 'days'}</div>
                <div><b>{trip.year}</b></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="repair-block">
        <span className="eyebrow">{t('about.bikes_eyebrow')}</span>
        <h2
          className="repair-title"
          dangerouslySetInnerHTML={{__html: t.raw('about.bikes_title') as string}}
        />
        <div className="bikes">
          <div className="bike-card" data-reveal>
            <div className="bike-wheels" style={{aspectRatio: '16 / 9', width: '100%', overflow: 'hidden'}}>
              <Image
                src="/bikes/motobecane.jpeg"
                alt="Motobecane single-speed"
                width={2048}
                height={1536}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
              />
            </div>
            <div
              className="bike-name"
              dangerouslySetInnerHTML={{__html: t.raw('about.bike_01_name') as string}}
            />
            <div className="bike-meta">
              <span>commuter</span><span>·</span><span>steel frame</span><span>·</span><span>1 gear, 1 brake</span>
            </div>
          </div>
          <div className="bike-card" data-reveal style={{['--d' as string]: 1} as React.CSSProperties}>
            <div className="bike-wheels" style={{aspectRatio: '16 / 9', width: '100%', overflow: 'hidden'}}>
              <Image
                src="/bikes/kona.jpeg"
                alt="Kona Rove gravel"
                width={2048}
                height={1536}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
              />
            </div>
            <div
              className="bike-name"
              dangerouslySetInnerHTML={{__html: t.raw('about.bike_02_name') as string}}
            />
            <div className="bike-meta">
              <span>long-haul</span><span>·</span><span>aluminium</span><span>·</span><span>drop bars, panniers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="novels-block">
        <div className="novels-head">
          <div>
            <span className="eyebrow">{t('about.novels_eyebrow')}</span>
            <h2
              className="novels-title"
              dangerouslySetInnerHTML={{__html: t.raw('about.novels_title') as string}}
            />
          </div>
          <div className="novels-aside">
            <p
              className="novels-lede"
              dangerouslySetInnerHTML={{__html: t.raw('about.novels_lede') as string}}
            />
            <Link
              className="novels-link"
              href="/hobbies/graphic-novels"
              data-cursor="open"
            >
              {t('about.novels_cta_all')}
            </Link>
          </div>
        </div>
        <div className="novels-shelf">
          {novels.map((n, i) => (
            <Link
              key={n.title}
              href="/hobbies/graphic-novels"
              className="novel"
              data-reveal
              data-cursor="open"
              style={{['--d' as string]: i} as React.CSSProperties}
            >
              <div
                className="novel-spine"
                // style={{['--c1' as string]: n.c1, ['--c2' as string]: n.c2} as React.CSSProperties}
                style={{backgroundImage: `url(${n.cover_url}), linear-gradient(135deg, ${n.c1}, ${n.c2})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
              >
              </div>
              <div className="novel-meta">
                <b>{n.title}</b>
                <span>{n.author}</span>
                <em>{n.genre}</em>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter rightLabel="05 / About" />
    </div>
  );
}
