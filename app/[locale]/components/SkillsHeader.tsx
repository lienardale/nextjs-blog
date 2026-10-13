import PageHeader from './PageHeader';
import SubTabs from './SubTabs';

export type SkillsTab = 'overview' | 'projects' | 'soft' | 'stack';

// Title, lede and sub-tabs shared by /skills and its three sub-routes.
// Takes the page's own translator so it stays a plain synchronous component.
export default function SkillsHeader({active, t}: {active: SkillsTab; t: (key: string) => string}) {
  return (
    <>
      <PageHeader title={t('nav.skills')} lede={t('skills.lede')} />
      <SubTabs
        active={active}
        tabs={[
          {id: 'overview', href: '/skills', label: t('skills.tab_overview')},
          {id: 'projects', href: '/skills/projects', label: t('skills.tab_projects')},
          {id: 'soft', href: '/skills/soft-skills', label: t('skills.tab_soft')},
          {id: 'stack', href: '/skills/stack', label: t('skills.tab_stack')},
        ]}
      />
    </>
  );
}
