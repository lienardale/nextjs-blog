import '../styles/globals.css'
import { AppProps } from 'next/app'
import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const { t, lang } = useTranslation('common')
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <title>{t('metaTitle')}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}