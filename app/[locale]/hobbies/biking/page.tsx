import Header from '../../components/Header';

const content = {
  en: {
    title: 'Biking',
    body: (
      <>
        <p>I travel</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>2021:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Nantes - Bordeaux: 6 days, 600kms</li>
              <li>Quimper - Vannes: 6 days, 300km</li>
            </ul>
          </li>
          <li>2020:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Chartres - Tours: 4 days, 300km</li>
            </ul>
          </li>
          <li>2019:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>La Panne - Lille: 1 day, 100km</li>
            </ul>
          </li>
          <li>2017:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Lille - Amsterdam - Lille: 8 days, 600km</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4">I repair</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>my single speed Motobecane</li>
          <li>my gravel Kona Rove Al</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'Vélo',
    body: (
      <>
        <p>Je voyage</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>2021 :
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Nantes - Bordeaux : 6 jours, 600kms</li>
              <li>Quimper - Vannes : 6 jours, 300km</li>
            </ul>
          </li>
          <li>2020 :
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Chartres - Tours : 4 jours, 300km</li>
            </ul>
          </li>
          <li>2019 :
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>La Panne - Lille : 1 jour, 100km</li>
            </ul>
          </li>
          <li>2017 :
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Lille - Amsterdam - Lille : 8 jours, 600km</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4">Je répare</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>mon Motobecane en single speed</li>
          <li>mon Gravel Kona Rove Al</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'Radfahren',
    body: (
      <>
        <p>Ich reise</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>2021:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Nantes - Bordeaux: 6 Tage, 600km</li>
              <li>Quimper - Vannes: 6 Tage, 300km</li>
            </ul>
          </li>
          <li>2020:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Chartres - Tours: 4 Tage, 300km</li>
            </ul>
          </li>
          <li>2019:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>La Panne - Lille: 1 Tag, 100km</li>
            </ul>
          </li>
          <li>2017:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Lille - Amsterdam - Lille: 8 Tage, 600km</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4">Ich repariere</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>mein single-speed Motobecane</li>
          <li>mein gravel Kona Rove Al</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'Ciclismo',
    body: (
      <>
        <p>Viajo</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>2021:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Nantes - Burdeos: 6 días, 600kms</li>
              <li>Quimper - Vannes: 6 días, 300km</li>
            </ul>
          </li>
          <li>2020:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Chartres - Tours: 4 días, 300km</li>
            </ul>
          </li>
          <li>2019:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>La Panne - Lille: 1 día, 100km</li>
            </ul>
          </li>
          <li>2017:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Lille - Amsterdam - Lille: 8 días, 600km</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4">Reparo</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>mi single speed Motobecane</li>
          <li>mi gravel Kona Rove Al</li>
        </ul>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function BikingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2022-05-12</div>
        <div className="prose">{t.body}</div>
      </article>
    </>
  );
}
