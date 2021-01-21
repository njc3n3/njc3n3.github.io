import { useContext, useEffect, useState } from 'react'
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

const LargeFormStyles = (spacing: string) => css`
  .btn-group {
    display: flex;
    justify-content: flex-start;
    button {
      margin-right: ${spacing};
      :last-of-type {
        margin-right: 0;
      }
    }
  }
`
const StyledForm = styled.div<{ spacing: string }>`
  select {
    padding: 0.25rem 0.5rem;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    margin-top: ${({ spacing }) => spacing};
  }
  .input-group {
    display: flex;
    flex-direction: column;
  }
  .text-input {
    margin-bottom: ${({ spacing }) => spacing};
  }

  ${({ spacing }) => largeScreenMixin(LargeFormStyles(spacing))}
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
  const [showDrafts, setShowDrafts] = useState(false)
  const baseUrl = showDrafts ? 'posts/drafts' : 'posts'
  const [url, setUrl] = useState(baseUrl)
  const [searchText, setSearchText] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const { data, loading, error } = useQuery<{ posts: PostType[] }>(url, undefined, getToken() || undefined)
  const { mainSpacing, mainSpacingRem, darkSubtitleText } = useContext(ThemeContext)

  useEffect(() => {
    setUrl(baseUrl)
  }, [baseUrl])

  const submitForm = () => {
    const tagString = `tag=${searchTag}`
    const textString = `text=${searchText}`

    if (searchTag && searchText) {
      setUrl(`${baseUrl}?${tagString}&${textString}`)
    } else if (searchTag || searchText) {
      if (searchTag) {
        setUrl(`${baseUrl}?${tagString}`)
      } else {
        setUrl(`${baseUrl}?${textString}`)
      }
    } else {
      setUrl(baseUrl)
    }
  }

  const clearForm = () => {
    setSearchTag('')
    setSearchText('')
  }

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
          <h3 style={{ marginBottom: mainSpacingRem }}>Search for {showDrafts ? 'drafts' : 'posts'}</h3>
          <StyledForm spacing={mainSpacingRem}>
            <div className='input-group'>
              <strong>Text: </strong>
              <Input
                placeholder='Enter search text here...'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className='text-input'
              />
              <strong>Tags: </strong>
              <select value={searchTag} onChange={e => setSearchTag(e.target.value)}>
                {availableTags?.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className='btn-group'>
              <Button onClick={e => submitForm()}>Search</Button>
              <Button onClick={e => clearForm()} color='secondary'>
                Clear
              </Button>
              {isLoggedIn() && (
                <Button onClick={() => setShowDrafts(!showDrafts)}>Show {showDrafts ? 'posts' : 'drafts'}</Button>
              )}
            </div>
          </StyledForm>
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
