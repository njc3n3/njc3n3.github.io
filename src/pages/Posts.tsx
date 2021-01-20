import { useContext } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '../hooks'
import { Content } from '../components/general'
import { ThemeContext } from '..'
import { largeScreenMixin, transitionMixin } from '../styles'

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
  const { data, loading, error } = useQuery<{ posts: PostType[] }>('posts')
  const { mainSpacing, darkSubtitleText } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    content = (
      <Container spacing={mainSpacing}>
        {data?.posts.map(
          ({ title, isPublished, tags, created, id }, index) =>
            isPublished && (
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
            )
        )}
      </Container>
    )
  }

  return <>{content}</>
}
