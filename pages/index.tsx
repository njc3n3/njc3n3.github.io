import { useEffect } from 'react'
import { useLocalStorage } from '../hooks'

export default function Home() {
  const [isDark, setIsDark] = useLocalStorage('isDark', true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className='flex flex-col items-center'>
      <p className='text-9xl'>Hello World</p>
      <button onClick={() => setIsDark(!isDark)} className='px-2 py-1 text-white bg-gray-400 rounded-md dark:bg-black'>
        {isDark ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
