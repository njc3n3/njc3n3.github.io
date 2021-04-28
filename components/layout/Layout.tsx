import { ReactNode } from 'react'
import Head from 'next/head'
import TopBar from './TopBar'

type Props = {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>Nick Coffey{title && ` | ${title}`}</title>
      </Head>
      <div className='flex flex-col h-screen'>
        <TopBar />
        {children}
      </div>
    </>
  )
}
