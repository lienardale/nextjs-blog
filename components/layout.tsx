import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link, { LinkProps } from 'next/link'
import useTranslation from 'next-translate/useTranslation';
import Section from './section'
import { GetStaticProps } from 'next'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, forwardRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const name = 'Alexandre Lienard'
export const siteTitle = 'alienard'

// type AnchorProps = React.HTMLProps<HTMLAnchorElement>
// type LinkProps = React.LinkHTMLAttributes<HTMLLinkElement>

// const MyLink = forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => {
//   let { href, locale, children, ...rest } = props;
//   return (
//     <Link href={href} locale={locale} >
//       <a ref={ref} {...rest}>
//         {children}
//       </a>
//     </Link>
//   )
// })

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const { t } = useTranslation('common');
  const title = "language";
  const data = [
      {
          id: '0',
          locale: 'en',
          title: 'english'
      },
      {
          id: '1',
          locale: 'fr',
          title: 'français'
      }
    ]
  
  const {asPath} = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/hardlink.ico" />
        <meta
          name="description"
          content="Alexandre Lienard's personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <div className={styles.languages}>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button data-dropdown-placement="bottom" className="inline-flex w-full m-1 justify-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 bg-opacity-80 px-4 py-2 text-xlg text-blue-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {title}
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
                      <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-blue-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ul className={utilStyles.list}>
                          {data.map(({ id, locale, title }) => (
                            // <MyLink href={`/${locale}`}>
                            <Link href={`/${asPath}`} locale={locale}>

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                  className={`${
                                    active ? 'bg-blue-500 text-black' : 'text-blue-900'
                                  } group flex w-full items-center justify-begin rounded-md px-5 py-2 text-sm m-1`}
                                  >
                                      <li key={id}>
                                          {title}
                                      </li>
                                    </button>
                                )}
                              </Menu.Item>
                            </Link>
                            // </MyLink>
                          ))}
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <div className={styles.languages}>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button data-dropdown-placement="bottom" className="inline-flex w-full m-1 justify-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 bg-opacity-80 px-4 py-2 text-xlg text-blue-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {title}
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
                      <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-blue-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ul className={utilStyles.list}>
                          {data.map(({ id, locale, title }) => (
                            // <MyLink href={`/${asPath}`} locale={locale}>
                            <Link href={`/${asPath}`} locale={locale}>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'bg-blue-500 text-black' : 'text-blue-900'
                                    } group flex w-full items-center justify-begin rounded-md px-5 py-2 text-sm m-1`}
                                  >
                                      <li key={id}>
                                          {title}
                                      </li>
                                    </button>
                                )}
                              </Menu.Item>
                            </Link>
                            // </MyLink>
                          ))}
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
