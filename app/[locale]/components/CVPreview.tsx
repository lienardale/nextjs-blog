import {getTranslations} from 'next-intl/server';

type Props = {
  url: string;
  locale: string;
};

export default async function CVPreview({url, locale}: Props) {
  const t = await getTranslations({locale});

  return (
    <div data-testid="cv-preview" className="flex flex-col gap-[14px]">
      {/* The CV is a light document whatever the site palette, so the frame
          is white by design rather than a token. */}
      <iframe
        src={url}
        title="CV"
        className="block aspect-[3/4] w-full rounded-lg border border-rule bg-[#ffffff]"
        data-testid="cv-iframe"
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-muted self-start text-[13px]"
        data-testid="cv-open-button"
      >
        {t('cv_open')} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
