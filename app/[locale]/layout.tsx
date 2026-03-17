import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {routing} from '../../lib/i18n/routing';
import BackToHome from './components/BackToHome';
import PageTransition from './components/PageTransition';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';
import ThemeProvider from './components/ThemeProvider';
import '../../styles/globals.css';

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
    title: t('metaTitle'),
    description: 'Alexandre Lienard\'s personal website using Next.js',
    icons: {icon: '/hardlink.ico'},
    openGraph: {
      title: 'alienard',
      images: [`https://og-image.vercel.app/${encodeURI('alienard')}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`],
    },
    twitter: {card: 'summary_large_image'},
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ScrollProgressBar />
            <div className="max-w-xl px-4 mx-auto mt-12 mb-24">
              <main>
                <PageTransition>{children}</PageTransition>
              </main>
              <BackToHome />
            </div>
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
