import { ReactNode } from 'react'
import Head from 'next/head'
import TopBar from './TopBar'

type Props = {
  children: ReactNode
  title?: string
  fullscreen?: boolean
}

export default function Layout({ children, title, fullscreen }: Props) {
  return (
    <>
      <Head>
        <title>Nick Coffey{title && ` | ${title}`}</title>
        <meta charSet='UTF-8' key='charset' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' key='viewport' />
        <meta name='description' content="Nick Coffey's digital resume and portfolio." key='description' />
      </Head>
      <div className={`flex flex-col ${fullscreen ? 'h-screen' : ''}`}>
        <TopBar />
        {children}
      </div>
    </>
  )
}
