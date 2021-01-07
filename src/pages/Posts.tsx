import { Fragment } from 'react'
import { useQuery } from '../hooks'

type Post = { id: string; created: string; updated: string; text: string }

export default function Posts() {
  const { data, loading, error } = useQuery<{ posts: Post[] }>('posts')

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    content = (
      <div style={{ marginTop: '1rem' }}>
        {data?.posts.map((post, index) => (
          <Fragment key={index}>
            <div
              style={{
                overflowWrap: 'break-word',
                marginBottom: index < data.posts.length - 1 ? '1rem' : undefined
              }}
            >
              {post.text}
            </div>
          </Fragment>
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
