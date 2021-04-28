import { useState } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = ['about', 'skills', 'work', 'contact']
  const baseMenuBarStyle = `w-8 h-1 bg-black dark:bg-white transition duration-150`
  return (
    <>
      <div className='flex items-center justify-between w-full px-4 mt-4'>
        <div className='p-1 border border-black dark:border-white'>NC</div>
        <div className='flex flex-col gap-2 cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'transform -rotate-45 translate-y-3'}`}></span>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'opacity-0'}`}></span>
          <span className={`${baseMenuBarStyle} ${isMenuOpen && 'transform rotate-45 -translate-y-3'}`}></span>
        </div>
      </div>

      <div
        className={`absolute z-10 transition-width duration-150 top-0 h-screen w-0 bg-black dark:bg-white bg-opacity-75 overflow-x-hidden ${
          isMenuOpen && 'w-5/6'
        }`}
      >
        <div className='flex flex-col gap-4 p-4 text-white dark:text-black'>
          <div className='flex mb-4'>
            <div className='p-1 border border-white dark:border-black'>NC</div>
          </div>
          {links.map((link, index) => (
            <Link href={`/${link}`} key={index}>
              <a className='text-3xl font-light capitalize'>{link}</a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
