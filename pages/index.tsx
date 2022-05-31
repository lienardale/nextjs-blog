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
import { getSortedLangsData } from '../lib/lang'
import { getSortedProjsData } from '../lib/proj'
import { getSortedSoftsData } from '../lib/soft'
import { getSortedStacksData } from '../lib/stack'
import Link, { LinkProps } from 'next/link'

import useTranslation from 'next-translate/useTranslation';

export default function Home({
  allExpData,
  allEducData,
  allPostData,
  allHobbiesData,
  allInfosData,
  allLanguagesData,
  allProjectsData,
  allSoftData,
  allStackData
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
  allLanguagesData: {
    date: string
    title: string
    id: string
  }[],
  allProjectsData: {
    date: string
    title: string
    id: string
  }[],
  allSoftData: {
    date: string
    title: string
    id: string
  }[],
  allStackData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const { t } = useTranslation('common');
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
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">Next.js' tutorial</a>.)
        </p>
        <br></br>
        <p>
          {t('intro2')}
        </p>
        <br></br>
      </section>
      <Section 
        data={allExpData}
        title='Experience'
        dir='experience' />
      <Section 
        data={allEducData}
        title='Education'
        dir='education' />
      <Section 
        data={allStackData}
        title='Stack'
        dir='stack' />
      <Section 
        data={allProjectsData}
        title='Projects'
        dir='projects' />
      <Section 
        data={allSoftData}
        title='Soft Skills'
        dir='soft_skills' />
      <Section 
        data={allLanguagesData}
        title='Languages'
        dir='languages' />
      <Section 
        data={allHobbiesData}
        title='Hobbies'
        dir='hobbies' />
      <Section 
        data={allInfosData}
        title='Infos'
        dir='infos' />
      <Section 
        data={allPostData}
        title='Posts'
        dir='posts' />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allExpData = getSortedExpsData();
  const allEducData = getSortedEducsData();
  const allPostData = getSortedPostsData();
  const allHobbiesData = getSortedHobbiesData();
  const allInfosData = getSortedInfosData();
  const allLanguagesData = getSortedLangsData();
  const allProjectsData = getSortedProjsData();
  const allSoftData = getSortedSoftsData();
  const allStackData = getSortedStacksData();
  return {
    props: {
      allExpData,
      allEducData,
      allPostData,
      allHobbiesData,
      allInfosData,
      allLanguagesData,
      allProjectsData,
      allSoftData,
      allStackData
    }
  }
}