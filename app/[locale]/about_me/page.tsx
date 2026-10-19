import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import AboutHeader from '../components/AboutHeader';
import SectionLabel from '../components/SectionLabel';
import TripExpand, {type Trip} from '../components/TripExpand';

// Trips with an id open their Komoot tour; the three oldest predate the
// Komoot log and show a route sketch instead.
const trips: Trip[] = [
  {id: '2281343685', year: '2025', name: 'Paris → Saint-Quentin (2/2)', km: '59', days: '0.3'},
  {id: '2279371256', year: '2025', name: 'Paris → Saint-Quentin (1/2)', km: '127', days: '0.7'},
  {id: '2155477868', year: '2025', name: 'Paris → Roubaix', km: '71', days: '1'},
  {id: '1830962536', year: '2024', name: 'Angers → Mesquer', km: '199', days: '1'},
  {id: '1623219446', year: '2024', name: 'Hourtin → Arcachon', km: '80', days: '1'},
  {id: '1567077210', year: '2024', name: 'Naxos Loop', km: '55', days: '1'},
  {id: '1256629528', year: '2023', name: 'Paris → Tours', km: '362', days: '3'},
  {id: '1073152740', year: '2023', name: 'Paris → Roubaix', km: '147', days: '1'},
  {id: '449141002', year: '2021', name: 'Nantes → Bordeaux', km: '600', days: '6'},
  {id: '439307756', year: '2021', name: 'Quimper → Vannes', km: '300', days: '6'},
  {year: '2020', name: 'Chartres → Tours', km: '300', days: '4', pathD: 'M30 25 L 80 40 L 110 55 L 175 80'},
  {year: '2019', name: 'La Panne → Lille', km: '100', days: '1', pathD: 'M25 25 L 50 35 L 75 40 L 110 60 L 175 80'},
  {year: '2017', name: 'Lille → Amsterdam → Lille', km: '600', days: '8', pathD: 'M30 70 Q 80 20 130 30 Q 160 40 130 60 Q 80 80 30 70'},
];

// Totals for the section label, derived from the list so they can't drift
// from it. Days are tenths (0.3, 0.7), hence the rounding.
const tripTotals = {
  trips: trips.length,
  km: trips.reduce((sum, trip) => sum + Number(trip.km), 0),
  days: Math.round(trips.reduce((sum, trip) => sum + Number(trip.days), 0) * 10) / 10,
};

const bikes = [
  {src: '/bikes/motobecane.jpeg', nameKey: 'about.bike_01_name', metaKey: 'about.bike_01_meta'},
  {src: '/bikes/kona.jpeg', nameKey: 'about.bike_02_name', metaKey: 'about.bike_02_meta'},
];

const novels = [
  {title: 'Asterios Polyp', c1: '#6b1f3a', c2: '#a14464', cover_url: '/covers/asterios-polyp.jpg'},
  {title: 'Maus', c1: '#2a2a2a', c2: '#5a5a5a', cover_url: '/covers/maus.jpg'},
  {title: 'Persepolis', c1: '#1a3a4a', c2: '#3d6c84', cover_url: '/covers/persepolis.jpg'},
  {title: 'Blankets', c1: '#3a2a14', c2: '#7a5a32', cover_url: '/covers/blankets.jpg'},
  {title: 'Le Sommet des Dieux', c1: '#3a4a52', c2: '#7088a0', cover_url: '/covers/le-sommet-des-dieux.jpg'},
  {title: 'Akira', c1: '#a02818', c2: '#e85c1a', cover_url: '/covers/akira.jpg'},
];

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('about.title_meta')};
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  const facts = [
    {label: t('about.fact_based'), value: t('location_city')},
    {label: t('about.tab_languages'), value: t('about.fact_languages_v')},
    {label: t('about.fact_background'), value: t('about.fact_background_v')},
    {
      label: t('nav.hobbies'),
      value: `${t('home.idx_05_meta')} · ${t('about.tab_languages').toLocaleLowerCase(locale)}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <AboutHeader active="about" t={t} />

      <div className="flex flex-col gap-14 pt-2">
        <dl>
          {facts.map((fact) => (
            <div key={fact.label} className="row grid-cols-[120px_minmax(0,1fr)] py-3 text-[14px]">
              <dt className="text-ink-muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section>
          <SectionLabel
            aside={
              <a
                href="https://www.komoot.com/user/1617431265877"
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted text-[13px]"
              >
                {t('about.komoot_full_log')} Komoot ↗
              </a>
            }
          >
            {t('about.trips_label')} ·{' '}
            {t('about.trips_meta', {
              trips: tripTotals.trips,
              km: tripTotals.km.toLocaleString(locale),
              days: tripTotals.days.toLocaleString(locale),
            })}
          </SectionLabel>
          <TripExpand trips={trips} />
        </section>

        <section>
          <SectionLabel>{t('about.bikes_title')}</SectionLabel>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {bikes.map((bike) => (
              <figure key={bike.src} className="flex flex-col gap-2">
                <Image
                  src={bike.src}
                  alt={t(bike.nameKey)}
                  width={2048}
                  height={1536}
                  sizes="(min-width: 712px) 328px, 100vw"
                  className="aspect-[4/3] w-full rounded-lg bg-bg-alt object-cover"
                />
                <figcaption className="flex flex-col gap-0.5 text-[14px]">
                  <span className="font-medium">{t(bike.nameKey)}</span>
                  <span className="text-[12px] text-ink-muted">{t(bike.metaKey)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel
            aside={
              <Link href="/hobbies/graphic-novels" className="link-muted text-[13px]">
                {t('about.novels_cta_all')}
              </Link>
            }
          >
            {t('about.novels_label')}
          </SectionLabel>
          <div className="grid grid-cols-6 gap-2.5">
            {novels.map((n) => (
              <Link
                key={n.title}
                href="/hobbies/graphic-novels"
                title={n.title}
                className="relative block aspect-[2/3] overflow-hidden rounded-sm transition-transform duration-[180ms] hover:-translate-y-0.5"
                style={{background: `linear-gradient(135deg, ${n.c1}, ${n.c2})`}}
              >
                <Image
                  src={n.cover_url}
                  alt={n.title}
                  fill
                  sizes="(min-width: 712px) 104px, 16vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
