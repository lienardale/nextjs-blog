import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import {Instrument_Serif, Inter_Tight, JetBrains_Mono} from 'next/font/google';
import {routing} from '../../lib/i18n/routing';
import CursorFollower from './components/CursorFollower';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';
import TopBar from './components/TopBar';
import '../../styles/globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return {
    metadataBase: new URL('https://alienard.vercel.app'),
    title: t('metaTitle'),
    description: t('metaDescription'),
    icons: {icon: '/hardlink.ico'},
    openGraph: {
      title: 'Alexandre Lienard',
      description: t('metaDescription'),
      images: ['/images/profile.jpg'],
    },
    twitter: {card: 'summary_large_image'},
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        de: '/de',
        es: '/es',
      },
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const fontVars = `${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang={locale} data-palette="a" className={fontVars} suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ScrollProgressBar />
          <CursorFollower />
          <TopBar />
          <main id="main-content" className="page-shell">
            <Suspense>{children}</Suspense>
          </main>
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
