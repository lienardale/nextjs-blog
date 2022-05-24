import Link, { LinkProps } from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { Menu, Transition } from '@headlessui/react'
import { forwardRef } from 'react'

// trying to implement https://headlessui.dev/react/menu

const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})

export default function Section({data, title, dir}){
    return (

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Menu>
          <Menu.Button>{title}</Menu.Button>
          <Menu.Items>
            <ul className={utilStyles.list}>
              {data.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Menu.Item>
                    <MyLink href={`/${dir}/${id}`}>{title}</MyLink>
                    {/* <Link href={`/${dir}/${id}`}>
                      <a>{title}</a>
                    </Link> */}
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </Menu.Item>
                </li>
              ))}
            </ul>
          </Menu.Items>
        </Menu>
      </section>
    )
}