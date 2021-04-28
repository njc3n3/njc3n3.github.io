import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-full gap-6 mt-4'>
        <div className='relative w-64 h-64'>
          <Image src='/me.jpg' alt='Picture of me' layout='fill' objectFit='cover' className='rounded-full' />
        </div>
        <div className='flex flex-col gap-4 text-center'>
          <p className='text-6xl font-light'>Nick Coffey</p>
          <p className='text-3xl text-gray-400 font-extralight'>Frontend Engineer</p>
        </div>
        <Link href='/contact'>
          <a className='p-2 text-xl transition duration-75 border border-black hover:text-white hover:border-blue-600 hover:bg-blue-600 dark:border-white'>
            Contact Me
          </a>
        </Link>
      </div>
    </Layout>
  )
}
