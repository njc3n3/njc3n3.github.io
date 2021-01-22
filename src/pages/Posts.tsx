import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '../hooks'
import { Button, Content, Input, Modal } from '../components/general'
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

const DeleteContainer = styled.div<{ spacing: number }>`
  padding: ${({ spacing }) => spacing}rem;
`

export default function Posts() {
  const history = useHistory()
  const { isLoggedIn, getToken } = useContext(AuthContext)
  const { mainSpacing, mainSpacingRem, darkSubtitleText } = useContext(ThemeContext)
  const [showDrafts, setShowDrafts] = useState(false)
  const baseUrl = showDrafts ? 'posts/drafts' : 'posts'
  const [url, setUrl] = useState(baseUrl)
  const [searchText, setSearchText] = useState('')
  const [searchTag, setSearchTag] = useState('')

  const [deletePost, setDeletePost] = useState<{ id: string; title: string }>()
  const { runMutation: deleteDraft } = useMutation(`posts?id=${deletePost?.id}`, 'delete', () => {
    window.location.reload() //refresh page
  })

  const { data, loading, error } = useQuery<{ posts: PostType[] }>(url, undefined, getToken() || undefined)
  const { runMutation: makeDraft } = useMutation('posts', 'put', res => {
    if (res.data) {
      console.log('SUCCESS')
      setShowDrafts(true)
    } else {
      console.error('CHECK DB')
    }
  })

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

  const handleDraftEditClick = (post: PostType) => {
    if (showDrafts) {
      history.push(`edit-draft/${post.id}`)
    } else {
      makeDraft({ ...post, isPublished: false }, getToken() || undefined)
    }
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

    const calcSpacing = `${mainSpacing / 2}rem`

    content = (
      <>
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
          {data?.posts.map(({ title, tags, created, id, isPublished }, index) => (
            <Content key={index}>
              <StyledLink hoverColor={darkSubtitleText} to={`/posts/${id}`}>
                <h1 style={{ marginBottom: calcSpacing }}>{title}</h1>
              </StyledLink>
              <p style={{ marginBottom: calcSpacing }}>{moment(created).format('MMMM Do, YYYY')}</p>
              {tags && (
                <p style={{ color: darkSubtitleText }}>
                  {tags.reduce(
                    (tagString, tag, index) => (tagString += `#${tag}${index !== tags.length - 1 ? ', ' : ''}`),
                    ''
                  )}
                </p>
              )}
              {isLoggedIn() && (
                <Button style={{ marginTop: calcSpacing }} onClick={() => handleDraftEditClick(data.posts[index])}>
                  {!isPublished ? 'Edit' : 'Make Draft'}
                </Button>
              )}
              {isLoggedIn() && !isPublished && (
                <Button
                  style={{ marginLeft: calcSpacing }}
                  onClick={() => setDeletePost({ id, title })}
                  color='secondary'
                >
                  Delete
                </Button>
              )}
            </Content>
          ))}
        </Container>
        <Modal isOpen={deletePost?.id !== undefined} close={() => setDeletePost(undefined)}>
          <DeleteContainer spacing={mainSpacing}>
            <p>
              Are you sure you want to delete <strong>{deletePost?.title}</strong>?
            </p>
            <Button color='secondary' onClick={() => setDeletePost(undefined)}>
              No
            </Button>
            <Button
              onClick={() => {
                deleteDraft(undefined, getToken() || undefined)
                setDeletePost(undefined)
              }}
              style={{ marginLeft: calcSpacing, marginTop: calcSpacing }}
            >
              Yes
            </Button>
          </DeleteContainer>
        </Modal>
      </>
    )
  }

  return <>{content}</>
}
