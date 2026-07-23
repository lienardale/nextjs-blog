import {getTranslations} from 'next-intl/server';

type Props = {
  url: string;
  locale: string;
};

export default async function CVPreview({url, locale}: Props) {
  const t = await getTranslations({locale});

  return (
    <div data-testid="cv-preview">
      <div className="border border-rule rounded-lg overflow-hidden">
        <iframe
          src={url}
          title="CV"
          className="w-full aspect-[3/4] bg-white"
          data-testid="cv-iframe"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-accent-fg font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          data-testid="cv-open-button"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {t('cv_open')}
        </a>
      </div>
    </div>
  );
}
