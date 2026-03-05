import Header from '../../components/Header';

const content = {
  en: {
    title: 'Graphic Novels',
    body: (
      <>
        <p>I like them (a lot)</p>
        <p>I buy them (when I can)</p>
        <p>I chronicle them (sometimes)</p>
      </>
    ),
  },
  fr: {
    title: 'Romans graphiques',
    body: (
      <>
        <p>Je les aime (beaucoup)</p>
        <p>Je les achète (quand je peux)</p>
        <p>Je les chronique (parfois)</p>
      </>
    ),
  },
  de: {
    title: 'Graphic Novels',
    body: (
      <>
        <p>Ich mag sie (sehr)</p>
        <p>Ich kaufe sie (wenn ich kann)</p>
        <p>Ich chronifiziere sie (manchmal)</p>
      </>
    ),
  },
  es: {
    title: 'Novelas gráficas',
    body: (
      <>
        <p>Me gustan (mucho)</p>
        <p>Los compro (cuando puedo)</p>
        <p>Las crónicas (a veces)</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function GraphicNovelsPage({params}: {params: Promise<{locale: string}>}) {
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
