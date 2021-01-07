import { useQuery } from '../hooks'
import { Content } from '../components/general'
import { StyledLink } from '../components'
import { ThemeContext } from '..'
import { useContext } from 'react'

export type PostType = {
  id: string
  title: string
  created: string
  updated: string
  content: { tag: string; text?: string; src?: string }[]
}

export default function Posts() {
  const { data, loading, error } = useQuery<{ posts: PostType[] }>('posts')
  const { mainSpacingRem, darkSubtitleText, darkText } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    content = (
      <>
        {data?.posts.map(({ title, created, id }, index) => (
          <Content key={index} style={{ marginBottom: index < data.posts.length - 1 ? mainSpacingRem : undefined }}>
            <StyledLink to={`/posts/${id}`} color={darkText} hover={darkSubtitleText}>
              <h1>{title}</h1>
            </StyledLink>
            <p>Posted: {new Date(created).toLocaleDateString()}</p>
          </Content>
        ))}
      </>
    )
  }

  return <>{content}</>
}
