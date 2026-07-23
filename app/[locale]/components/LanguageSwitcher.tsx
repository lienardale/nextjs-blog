'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '../../../lib/i18n/navigation';
import {Menu, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';

const languages = [
  {locale: 'en', title: 'english'},
  {locale: 'fr', title: 'francais'},
  {locale: 'es', title: 'espanol'},
  {locale: 'de', title: 'deutsch'},
] as const;

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        data-dropdown-placement="bottom"
        className="inline-flex w-full m-1 justify-center rounded-md bg-paper shadow-lg ring-1 ring-black ring-opacity-5 bg-opacity-80 px-4 py-2 text-xlg text-accent hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {t('trad_button')}
        <ChevronDownIcon
          className="ml-2 -mr-1 h-7 w-5 text-white-200 hover:text-white-100"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-rule rounded-md bg-paper shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="list-none p-0 m-0">
            {languages.map(({locale: loc, title}) => (
              <Menu.Item key={loc}>
                <button
                  onClick={() => router.replace(pathname, {locale: loc})}
                  className="text-accent group flex w-full items-center rounded-md px-5 py-2 text-sm m-1 hover:bg-accent hover:text-accent-fg"
                >
                  {title}
                </button>
              </Menu.Item>
            ))}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
