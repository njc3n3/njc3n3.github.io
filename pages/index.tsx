import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const baseMenuBarStyle = `w-8 h-1 bg-black dark:bg-white transition duration-150`
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center justify-between w-full px-4 mt-4'>
        <div className='p-1 border border-black dark:border-white'>NC</div>
        <div className='flex flex-col gap-2 cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'transform -rotate-45 translate-y-3'}`}></span>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'opacity-0'}`}></span>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'transform rotate-45 -translate-y-3'}`}></span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center h-full gap-6 mt-4'>
        <div className='relative w-64 h-64'>
          <Image src='/me.jpg' alt='Picture of me' layout='fill' objectFit='cover' className='rounded-full' />
        </div>
        <div className='flex flex-col gap-4 text-center'>
          <p className='text-6xl font-light'>Nick Coffey</p>
          <p className='text-3xl text-gray-400 font-extralight'>Frontend Engineer</p>
        </div>
        <Link href='/contact'>
          <a className='p-2 transition duration-75 border border-black hover:text-white hover:border-blue-600 hover:bg-blue-600 dark:border-white'>
            Contact Me
          </a>
        </Link>
      </div>
    </div>
  )
}
