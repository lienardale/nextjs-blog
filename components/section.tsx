import React from 'react'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, forwardRef } from 'react'
import { ChevronDownIcon, DocumentIcon, AcademicCapIcon, BriefcaseIcon, CodeIcon, TerminalIcon, UserGroupIcon, ChatIcon, PuzzleIcon, MailIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';

// implemented https://headlessui.dev/react/menu

type AnchorProps = React.HTMLProps<HTMLAnchorElement>

const MyLink = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})

function Section({data, title, dir}){

    let icon = <DocumentIcon
      className="mr-2 h-5 w-5"
      aria-hidden="true"
    />

    if (title === "Professionnal Experience"){
      icon = <BriefcaseIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Education"){
      icon = <AcademicCapIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Stack"){
      icon = <CodeIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Projects"){
      icon = <TerminalIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Soft Skills"){
      icon = <UserGroupIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Languages"){
      icon = <ChatIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Hobbies"){
      icon = <PuzzleIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Infos"){
      icon = <MailIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    } else if (title === "Posts"){
      icon = <DocumentIcon
        className="mr-2 h-5 w-5"
        aria-hidden="true"
      />
    }
    const router = useRouter();
    const { locale, locales, defaultLocale } = router;
  //  className="container flex items-center justify-center h-30 m-auto m-3 bg-fixed bg-center bg-cover custom-img"
    return (
      <section
          className="flex items-center justify-center h-30 mb-5 bg-fixed bg-center bg-cover custom-img"
        >
        <div className="p-5 text-2xl text-white rounded-xl">
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Menu>
        {({ open }) => (
           <>
          <Menu.Button className="inline-flex m-1 justify-center rounded-md bg-gray-700 bg-opacity-80 px-4 py-2 text-xlg text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {title}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-100"
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
            <Menu.Items className=" mt-2 w-fit divide-y divide-gray-100 rounded-md bg-gray-100 shadow-lg ring-1 ring-gray-700 ring-opacity-5 focus:outline-none">
              <ul className={utilStyles.list}>
                {data.map(({ id, date, title: itemTitle }) => (
                  <Menu.Item key={id}>
                    {({ active }) => (
                      <Link
                        href={`${dir}/${id}`}
                        className={`${
                          active ? 'bg-gray-500 text-white' : 'text-gray-900'
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
          </>
      )}
        </Menu>
      </section>
    </div>
  </section>
    )
}

Section.displayName = 'Section';
export default React.memo(Section);