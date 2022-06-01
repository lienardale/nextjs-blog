import Layout from '../../components/layout'
import { getAllInfoIds, getInfoData } from '../../lib/info'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';

export default function Info({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  const { locale } = useRouter();
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllInfoIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getInfoData(params.id as string)
  return {
    props: {
      postData
    }
  }
}