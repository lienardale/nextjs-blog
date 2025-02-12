import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getSortedExpsData } from '../lib/exp'
import { GetStaticProps } from 'next'
import Section from '../components/section'
import { getSortedEducsData } from '../lib/educ'
import { getSortedHobbiesData } from '../lib/hob'
import { getSortedInfosData } from '../lib/info'
import { getSortedSoftsData } from '../lib/soft'
import { useRouter } from 'next/router';

import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans'
import TransText from 'next-translate/TransText'


export default function Home({
  allExpData,
  allEducData,
  allPostData,
  allHobbiesData,
  allInfosData,
  allSoftData
}: {
  allExpData: {
    date: string
    title: string
    id: string
  }[],
  allEducData: {
    date: string
    title: string
    id: string
  }[],
  allPostData: {
    date: string
    title: string
    id: string
  }[],
  allHobbiesData: {
    date: string
    title: string
    id: string
  }[],
  allInfosData: {
    date: string
    title: string
    id: string
  }[],
  allSoftData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const sections = [
    {
      id:'0',
      data:allExpData,
      title:t('categ0'),
      dir:'experience',
    },
    {
      id:'1',
      data:allEducData,
      title:t('categ1'),
      dir:'education',
    },
    {
      id:'2',
      data:allSoftData,
      title:t('categ2'),
      dir:'skills',
    },
    {
      id:'3',
      data:allInfosData,
      title:t('categ3'),
      dir:'about_me',
    },
    {
      id:'4',
      data:allHobbiesData,
      title:t('categ4'),
      dir:'hobbies',
    },
    {
      id:'5',
      data:allPostData,
      title:t('categ5'),
      dir:'posts',
    }
  ]

  return (
    <Layout home>
      <Head>
        <title>{t('metaTitle')}</title>
      </Head>
      <header
        className="flex items-center justify-center h-30 mb-5 bg-fixed bg-center bg-cover custom-img"
      >
        <div className="p-5 h-15 text-2xl text-white rounded-xl">
          {t('title')}
        </div>
      </header>
      <section className={utilStyles.headingMd}>
        <p>
          {t('intro')}
        </p>
        <p>
          {/* <Trans 
            i18nKey="common:intro1"
            components={{
              component: <Component />,
              b: <b className="red" />,
            }}
            values={{ count: 42 }}
            defaultTrans="<component>The number is <b>{{count}}</b></component>"
          /> */}
            <TransText
              text={t('intro1')}
              components={{
                link: <a href="https://nextjs.org/learn" />,
              }}
            />
        </p>
        <br></br>
        <p>
          {t('intro2')}
        </p>
        <br></br>
      </section>
      {sections.map(({id, data, title, dir}) => (
        <ul className={utilStyles.listItem} key={id}>
          <Section
            data={data}
            title={title}
            dir={dir} />
          </ul>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const allExpData = getSortedExpsData(locale);
  const allEducData = getSortedEducsData(locale);
  const allPostData = getSortedPostsData(locale);
  const allHobbiesData = getSortedHobbiesData(locale);
  const allInfosData = getSortedInfosData(locale);
  const allSoftData = getSortedSoftsData(locale);
  return {
    props: {
      allExpData,
      allEducData,
      allPostData,
      allHobbiesData,
      allInfosData,
      allSoftData
    }
  }
}