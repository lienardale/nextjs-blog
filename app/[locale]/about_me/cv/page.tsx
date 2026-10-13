import {getTranslations} from 'next-intl/server';
import AboutHeader from '../../components/AboutHeader';
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
  const t = await getTranslations({locale});

  return (
    <div className="flex flex-col gap-8">
      <AboutHeader active="cv" t={t} />
      <div className="pt-2">
        <CVPreview url={CV_URL} locale={locale} />
      </div>
    </div>
  );
}
