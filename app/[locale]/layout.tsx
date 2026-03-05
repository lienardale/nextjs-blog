import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../lib/i18n/routing';
import BackToHome from './components/BackToHome';
import PageTransition from './components/PageTransition';
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="max-w-xl px-4 mx-auto mt-12 mb-24">
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <BackToHome />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
