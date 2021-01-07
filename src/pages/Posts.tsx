import { Link } from 'react-router-dom'
import { useQuery } from '../hooks'
import { Content } from '../components/general'

export type PostType = {
  id: string
  title: string
  created: string
  updated: string
  content: { tag: string; text?: string; src?: string }[]
}

export default function Posts() {
  const { data, loading, error } = useQuery<{ posts: PostType[] }>('posts')

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    content = (
      <div style={{ marginTop: '1rem' }}>
        {data?.posts.map(({ title, created, id }, index) => (
          <Content key={index}>
            <Link to={`/posts/${id}`}>
              <h1>{title}</h1>
            </Link>
            <p>{created}</p>
          </Content>
        ))}
      </div>
    )
  }

  return (
    <>
      <h1>Posts</h1>
      {content}
    </>
  )
}
