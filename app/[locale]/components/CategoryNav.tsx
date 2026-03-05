'use client';

import {usePathname} from 'next/navigation';
import {Link} from '../../../lib/i18n/navigation';

type NavItem = {id: string; label: string};

export default function CategoryNav({items, baseDir}: {items: NavItem[]; baseDir: string}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
      {items.map((item) => {
        const href = `/${baseDir}/${item.id}`;
        const isActive = pathname.endsWith(`/${item.id}`);

        return (
          <Link
            key={item.id}
            href={href}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
