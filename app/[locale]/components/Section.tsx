'use client';

import React from 'react';
import {Link} from '../../../lib/i18n/navigation';
import {useLocale} from 'next-intl';
import Date from './Date';
import {Menu, Transition} from '@headlessui/react';
import {
  ChevronDownIcon,
  DocumentTextIcon as DocumentIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon as CodeIcon,
  CommandLineIcon as TerminalIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon as ChatIcon,
  PuzzlePieceIcon as PuzzleIcon,
  EnvelopeIcon as MailIcon,
} from '@heroicons/react/24/solid';

type SectionItem = {id: string; date: string; title: string};

const iconMap: Record<string, React.ReactNode> = {
  experience: <BriefcaseIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
  education: <AcademicCapIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
  skills: <CodeIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
  about_me: <MailIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
  hobbies: <PuzzleIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
  posts: <DocumentIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
};

function Section({data, title, dir}: {data: SectionItem[]; title: string; dir: string}) {
  const locale = useLocale();
  const icon = iconMap[dir] ?? <DocumentIcon className="mr-2 h-5 w-5" aria-hidden="true" />;

  return (
    <section className="flex items-center justify-center mb-5 bg-fixed bg-center bg-cover custom-img">
      <div className="p-5 text-2xl text-white rounded-xl">
        <section className="text-lg leading-relaxed pt-px">
          <Menu>
            {({open}) => (
              <div>
                <Menu.Button className="inline-flex m-1 justify-center rounded-md bg-gray-700/80 dark:bg-gray-600/80 px-4 py-2 text-xlg text-white hover:bg-gray-700/30 dark:hover:bg-gray-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  {title}
                  <ChevronDownIcon
                    className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as="div"
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="relative z-10 mt-2 w-fit divide-y divide-gray-100 dark:divide-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 shadow-lg ring-1 ring-gray-700/5 dark:ring-gray-600/5 focus:outline-none">
                    <ul className="list-none p-0 m-0">
                      {data.map(({id, date, title: itemTitle}) => (
                        <Menu.Item key={id}>
                          {({active}) => (
                            <Link
                              href={`/${dir}/${id}`}
                              className={`${
                                active ? 'bg-gray-500 text-white' : 'text-gray-900 dark:text-gray-100'
                              } group flex w-full items-start rounded-md px-2 py-2 text-sm`}
                            >
                              {icon}
                              <div>
                                {itemTitle}
                                <br />
                                <small>
                                  <Date dateString={date} locale={locale} />
                                </small>
                              </div>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </ul>
                  </Menu.Items>
                </Transition>
              </div>
            )}
          </Menu>
        </section>
      </div>
    </section>
  );
}

export default React.memo(Section);
