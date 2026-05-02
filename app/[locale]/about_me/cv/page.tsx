import CVPreview from '../../components/CVPreview';

const CV_URL = 'https://lienardale.github.io/markdown-cv/';

const pageTitle: Record<string, string> = {
  en: 'CV',
  fr: 'CV',
  de: 'Lebenslauf',
  es: 'Currículum',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: pageTitle[locale] ?? pageTitle.en};
}

export default async function CVPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">
          {pageTitle[locale] ?? pageTitle.en}
        </h1>
        <CVPreview url={CV_URL} locale={locale} />
      </article>
    </>
  );
}
