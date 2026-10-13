import {Link} from '../../../lib/i18n/navigation';

export type SubTab = {id: string; href: string; label: string};

// Section sub-navigation (Skills, Hobbies). Each page says which tab it is,
// so the active state is in the server HTML.
export default function SubTabs({tabs, active}: {tabs: SubTab[]; active: string}) {
  return (
    <nav className="flex flex-wrap gap-x-5 border-b border-rule">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`-mb-px border-b pb-2.5 text-[13px] transition-colors duration-[180ms] ${
              isActive ? 'border-ink text-ink' : 'border-transparent text-ink-muted hover:text-ink'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
