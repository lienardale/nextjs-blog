import Header from '../../components/Header';

const content = {
  en: {
    title: 'Podcasts',
    body: (
      <>
        <p>I listen to them (a lot):</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Studio 404 (RIP)</li>
          <li>Floodcast</li>
          <li>Un podcast a soi</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'Podcasts',
    body: (
      <>
        <p>Je les écoute (beaucoup) :</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Studio 404 (RIP)</li>
          <li>Floodcast</li>
          <li>Un podcast a soi</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'Podcasts',
    body: (
      <>
        <p>Ich höre sie (oft):</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Studio 404 (RIP)</li>
          <li>Floodcast</li>
          <li>Un podcast a soi</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'Podcasts',
    body: (
      <>
        <p>Los escucho (mucho):</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Studio 404 (RIP)</li>
          <li>Floodcast</li>
          <li>Un podcast a soi</li>
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

export default async function PodcastsPage({params}: {params: Promise<{locale: string}>}) {
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
