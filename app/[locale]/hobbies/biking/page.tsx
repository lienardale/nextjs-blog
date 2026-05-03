import TripSummary from '../../components/TripSummary';
import TripCard from '../../components/TripCard';

// --- Localized labels ---

const labels = {
  en: {
    title: 'Biking',
    travel: 'I travel',
    repair: 'I repair',
    days: 'days',
    summaryTrips: 'trips',
    summaryKm: 'km total',
    summaryDays: 'days on the road',
    bikes: ['my single speed Motobecane', 'my gravel Kona Rove Al'],
  },
  fr: {
    title: 'Vélo',
    travel: 'Je voyage',
    repair: 'Je répare',
    days: 'jours',
    summaryTrips: 'voyages',
    summaryKm: 'km au total',
    summaryDays: 'jours sur la route',
    bikes: ['mon Motobecane en single speed', 'mon Gravel Kona Rove Al'],
  },
  de: {
    title: 'Radfahren',
    travel: 'Ich reise',
    repair: 'Ich repariere',
    days: 'Tage',
    summaryTrips: 'Reisen',
    summaryKm: 'km insgesamt',
    summaryDays: 'Tage unterwegs',
    bikes: ['mein single-speed Motobecane', 'mein gravel Kona Rove Al'],
  },
  es: {
    title: 'Ciclismo',
    travel: 'Viajo',
    repair: 'Reparo',
    days: 'días',
    summaryTrips: 'viajes',
    summaryKm: 'km en total',
    summaryDays: 'días en ruta',
    bikes: ['mi single speed Motobecane', 'mi gravel Kona Rove Al'],
  },
} as const;

type Locale = keyof typeof labels;

// --- Trip data ---

const trips = [
  {
    route: {en: '127 km day · May 2025', fr: 'Sortie de 127 km · mai 2025', de: '127-km-Tag · Mai 2025', es: 'Día de 127 km · mayo 2025'},
    year: 2025, days: 1, km: 127, komootTourId: '2279371256',
  },
  {
    route: {en: 'Angers → Mesquer', fr: 'Angers → Mesquer', de: 'Angers → Mesquer', es: 'Angers → Mesquer'},
    year: 2024, days: 1, km: 199, komootTourId: '1830962536',
  },
  {
    route: {en: 'Hourtin → Arcachon', fr: 'Hourtin → Arcachon', de: 'Hourtin → Arcachon', es: 'Hourtin → Arcachon'},
    year: 2024, days: 1, km: 80, komootTourId: '1623219446',
  },
  {
    route: {en: 'Naxos Loop (Greece)', fr: 'Boucle de Naxos (Grèce)', de: 'Naxos-Runde (Griechenland)', es: 'Vuelta a Naxos (Grecia)'},
    year: 2024, days: 1, km: 55, komootTourId: '1567077210',
  },
  {
    route: {en: 'Paris → Tours', fr: 'Paris → Tours', de: 'Paris → Tours', es: 'París → Tours'},
    year: 2023, days: 3, km: 362, komootTourId: '1256629528',
  },
  {
    route: {en: 'Nantes → Bordeaux', fr: 'Nantes → Bordeaux', de: 'Nantes → Bordeaux', es: 'Nantes → Burdeos'},
    year: 2021, days: 6, km: 600, komootTourId: '449141002',
  },
  {
    route: {en: 'Quimper → Vannes', fr: 'Quimper → Vannes', de: 'Quimper → Vannes', es: 'Quimper → Vannes'},
    year: 2021, days: 6, km: 300, komootTourId: '439307756',
  },
  {
    route: {en: 'Chartres → Tours', fr: 'Chartres → Tours', de: 'Chartres → Tours', es: 'Chartres → Tours'},
    year: 2020, days: 4, km: 300,
    waypoints: [
      [48.4469, 1.4892],  // Chartres
      [48.0711, 1.3736],  // Châteaudun
      [47.5939, 1.3281],  // Vendôme area
      [47.3941, 0.6848],  // Tours
    ] as [number, number][],
  },
  {
    route: {en: 'La Panne → Lille', fr: 'La Panne → Lille', de: 'De Panne → Lille', es: 'La Panne → Lille'},
    year: 2019, days: 1, km: 100,
    waypoints: [
      [51.1000, 2.5833],  // De Panne
      [51.0340, 2.3770],  // Dunkerque
      [50.9493, 2.1249],  // Bergues
      [50.7226, 2.5367],  // Bailleul
      [50.6292, 3.0573],  // Lille
    ] as [number, number][],
  },
  {
    route: {en: 'Lille → Amsterdam → Lille', fr: 'Lille → Amsterdam → Lille', de: 'Lille → Amsterdam → Lille', es: 'Lille → Ámsterdam → Lille'},
    year: 2017, days: 8, km: 600,
    waypoints: [
      [50.6292, 3.0573],  // Lille
      [50.8503, 2.8825],  // Ypres area
      [51.0544, 3.7175],  // Ghent
      [51.2194, 4.4025],  // Antwerp
      [51.4416, 5.4697],  // Eindhoven
      [51.8126, 5.8372],  // Nijmegen
      [52.0907, 5.1214],  // Utrecht
      [52.3676, 4.9041],  // Amsterdam
      [52.0907, 5.1214],  // Utrecht (return)
      [51.5866, 4.7750],  // Breda
      [51.2194, 4.4025],  // Antwerp (return)
      [50.8503, 3.3488],  // Kortrijk
      [50.6292, 3.0573],  // Lille
    ] as [number, number][],
  },
] as const;

const totalKm = trips.reduce((sum, t) => sum + t.km, 0);
const totalDays = trips.reduce((sum, t) => sum + t.days, 0);

// --- Page ---

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: labels[locale as Locale]?.title ?? labels.en.title};
}

export default async function BikingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = labels[locale as Locale] ?? labels.en;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>

        <TripSummary
          totalTrips={trips.length}
          totalKm={totalKm}
          totalDays={totalDays}
          labels={{trips: t.summaryTrips, km: t.summaryKm, days: t.summaryDays}}
        />

        <h2 className="text-xl font-bold mt-8 mb-4">{t.travel}</h2>
        <div className="space-y-4">
          {trips.map((trip, i) => (
            <TripCard
              key={i}
              route={trip.route[locale as Locale] ?? trip.route.en}
              year={trip.year}
              days={trip.days}
              km={trip.km}
              komootTourId={'komootTourId' in trip ? (trip as {komootTourId: string}).komootTourId : undefined}
              waypoints={'waypoints' in trip ? (trip as {waypoints: [number, number][]}).waypoints : undefined}
              dayLabel={t.days}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">{t.repair}</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          {t.bikes.map((bike) => (
            <li key={bike}>{bike}</li>
          ))}
        </ul>
      </article>
    </>
  );
}
