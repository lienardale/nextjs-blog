import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

export default function Section({data, title, dir}){
    return (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{title}</h2>
        <ul className={utilStyles.list}>
          {data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${dir}/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    )
}