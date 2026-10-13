import SubTabs from './SubTabs';

export type AboutTab = 'about' | 'infos' | 'languages' | 'cv';

// Title, intro and sub-tabs shared by /about_me and its three sub-routes.
// Takes the page's own translator so it stays a plain synchronous component.
export default function AboutHeader({active, t}: {active: AboutTab; t: (key: string) => string}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="page-h1">{t('about.title')}</h1>
        <p className="text-pretty text-ink-soft">{t('about.intro')}</p>
      </div>
      <SubTabs
        active={active}
        tabs={[
          {id: 'about', href: '/about_me', label: t('about.tab_about')},
          {id: 'infos', href: '/about_me/infos', label: t('nav.infos')},
          {id: 'languages', href: '/about_me/languages', label: t('about.tab_languages')},
          {id: 'cv', href: '/about_me/cv', label: t('about.tab_cv')},
        ]}
      />
    </>
  );
}
