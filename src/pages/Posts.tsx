import { useContext } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '../hooks'
import { Button, Content, Input } from '../components/general'
import { ThemeContext } from '..'
import { largeScreenMixin, transitionMixin } from '../styles'
import { AuthContext } from '../App'

export type PostType = {
  id: string
  title: string
  content: string
  isPublished: boolean
  tags: string[]
  created: string
  updated: string
}

const LargeContainerStyles = (spacing: number) => css`
  padding: ${spacing}rem ${spacing * 8}rem;
`
const Container = styled.div<{ spacing: number }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ spacing }) => spacing}rem;
  ${({ spacing }) => largeScreenMixin(LargeContainerStyles(spacing))}
`

const StyledLink = styled(Link)<{ hoverColor: string }>`
  color: inherit;
  text-decoration: none;

  ${transitionMixin('color')}
  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`

export default function Posts() {
  const { isLoggedIn, getToken } = useContext(AuthContext)
  const { data, loading, error } = useQuery<{ posts: PostType[] }>(
    isLoggedIn() ? 'posts/drafts' : 'posts',
    undefined,
    getToken() || undefined
  )
  const { mainSpacing, mainSpacingRem, darkSubtitleText } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    const availableTags = data?.posts.reduce<string[]>(
      (total, currentPost) => [...total, ...currentPost.tags.filter(tag => !total.includes(tag))],
      ['']
    )

    content = (
      <Container spacing={mainSpacing}>
        <Content style={{ marginBottom: mainSpacingRem }}>
          <h3 style={{ marginBottom: mainSpacingRem }}>Search for a post</h3>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', marginBottom: mainSpacingRem }}>
            <Input placeholder='Enter search text here...' style={{ flex: 1 }} />
            <strong style={{ paddingLeft: mainSpacingRem, paddingRight: `${mainSpacing / 2}rem` }}>Tags: </strong>
            <select style={{ padding: '0.25rem 0.5rem' }}>
              {availableTags?.map((tag, index) => (
                <option key={index} value={index}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <Button>Search</Button>
        </Content>
        {data?.posts.map(({ title, tags, created, id }, index) => (
          <Content key={index}>
            <StyledLink hoverColor={darkSubtitleText} to={`/posts/${id}`}>
              <h1 style={{ marginBottom: `${mainSpacing / 2}rem` }}>{title}</h1>
            </StyledLink>
            <p style={{ marginBottom: `${mainSpacing / 2}rem` }}>{moment(created).format('MMMM Do, YYYY')}</p>
            {tags && (
              <p style={{ color: darkSubtitleText }}>
                {tags.reduce(
                  (tagString, tag, index) => (tagString += `#${tag}${index !== tags.length - 1 ? ', ' : ''}`),
                  ''
                )}
              </p>
            )}
          </Content>
        ))}
      </Container>
    )
  }

  return <>{content}</>
}
