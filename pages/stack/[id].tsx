import Layout from '../../components/layout'
import { getAllStackIds, getStackData } from '../../lib/stack'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';

export default function Stack({
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
          <Date dateString={postData.date} locale={locale} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  const paths = getAllStackIds(locales)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postData = await getStackData(params.id as string, locale)
  return {
    props: {
      postData
    }
  }
}