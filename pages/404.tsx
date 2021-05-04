import { useRouter } from 'next/router'
import { Layout } from '../components/layout'

export default function NotFound() {
  const router = useRouter()

  return (
    <Layout title='Not Found' fullscreen>
      <div className='flex flex-col justify-center h-full gap-4 text-center'>
        <p className='text-5xl'>Page not found</p>
        <div className='flex justify-center'>
          <a
            onClick={() => router.back()}
            className='p-2 text-xl transition duration-75 border border-black cursor-pointer hover:text-white hover:border-blue-600 hover:bg-blue-600 dark:border-white'
          >
            Go Back
          </a>
        </div>
      </div>
    </Layout>
  )
}
