
  
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostData } from '../lib/posts'
import Section from '../components/section'
import { GetStaticProps } from 'next'

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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Software developer with a background in marketing.
          Experience in teamwork & project coordination.
          Looking for the company that will make me a better developer, 
          the projects I will contribute to & the team I’ll grow with.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">Next.js' tutorial</a>.)
        </p>
      </section>
      <Section 
        data={allExpData}
        name='Professionnal Experience'
        dir='posts/experience' />
      <Section 
        data={allEducData}
        name='Education'
        dir='posts/education' />
      <Section 
        data={allStackData}
        name='Stack'
        dir='posts/stack' />
      <Section 
        data={allProjectsData}
        name='Projects'
        dir='posts/projects' />
      <Section 
        data={allSoftData}
        name='Soft Skills'
        dir='posts/soft_skills' />
      <Section 
        data={allLanguagesData}
        name='Languages'
        dir='posts/languages' />
      <Section 
        data={allHobbiesData}
        name='Hobbies'
        dir='posts/hobbies' />
      <Section 
        data={allInfosData}
        name='Infos'
        dir='posts/infos' />
      <Section 
        data={allPostData}
        name='Posts'
        dir='posts/posts' />
      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allExpData = getSortedPostData({dir : 'posts/experience'});
  const allEducData = getSortedPostData({dir : 'posts/education'});
  const allPostData = getSortedPostData({dir : 'posts/posts'});
  const allHobbiesData = getSortedPostData({dir : 'posts/hobbies'});
  const allInfosData = getSortedPostData({dir : 'posts/infos'});
  const allLanguagesData = getSortedPostData({dir : 'posts/languages'});
  const allProjectsData = getSortedPostData({dir : 'posts/projects'});
  const allSoftData = getSortedPostData({dir : 'posts/soft_skills'});
  const allStackData = getSortedPostData({dir : 'posts/stack'});
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