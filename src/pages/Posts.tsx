import { createElement, Fragment } from 'react'
import { useQuery } from '../hooks'

type Post = {
  id: string
  title: string
  created: string
  updated: string
  content: { tag: string; text?: string; src?: string }[]
}

function getJSX(tag: string, text: string = '', src?: string) {
  let element = <></>
  if (tag === 'img' && src) {
    element = createElement(tag, { src, width: '100%', style: { borderRadius: '0.25rem' } })
  } else {
    element = createElement(tag, null, text)
  }

  return element
}

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
              {post.content.map(({ tag, text, src }, index) => (
                <Fragment key={index}>{getJSX(tag, text, src)}</Fragment>
              ))}
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
