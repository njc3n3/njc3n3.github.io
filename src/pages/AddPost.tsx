import { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { PostContent } from '../components/posts'
import { StyledPostContent } from '.'
import { ThemeContext } from '..'
import { largeScreenMixin } from '../styles'
import { Button, Content, Input } from '../components/general'
import { useMutation } from '../hooks'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../App'

const LargeScreenTextAreaStyles = css`
  height: 50vh;
`
const TextArea = styled.textarea<{ color: string }>`
  font-size: 100%;
  height: 25vh;
  width: 100%;
  margin-top: 1rem;
  background-color: ${({ color }) => color};
  resize: none;
  border: none;
  outline: none;
  ${largeScreenMixin(LargeScreenTextAreaStyles)}
`

const LargeScreenButtonRowStyles = css`
  justify-content: flex-end;
  button {
    margin-right: 1rem;
    :last-of-type {
      margin-right: 0;
    }
  }
`
const StyledButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  &.editing {
    justify-content: flex-end;
  }
  ${largeScreenMixin(LargeScreenButtonRowStyles)}
  margin-bottom: 1rem;
`

export default function AddPost() {
  const history = useHistory()
  const { surfaceColor } = useContext(ThemeContext)
  const { getToken } = useContext(AuthContext)
  const [content, setContent] = useState('# Enter content here')
  const [serverContent, setServerContent] = useState(content)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [serverTags, setServerTags] = useState<string[]>([])
  const [editMode, setEditMode] = useState(true)

  const { runMutation } = useMutation('posts/create', 'post', res => {
    if (res.data) {
      console.log('SUCCESS')
      history.push('/posts')
    } else {
      console.error('CHECK DB')
    }
  })

  function savePubPost(isPublished: boolean) {
    const token = getToken()
    if (token !== null) {
      runMutation({ title, content: serverContent, isPublished, tags: serverTags }, token)
    } else {
      console.error('NULL TOKEN')
    }
  }

  useEffect(() => {
    setServerContent(JSON.stringify(content).replaceAll('"', ''))
    setServerTags(tags.split(','))
  }, [content, tags])

  const ButtonRow = (
    <StyledButtonRow className={editMode ? 'editing' : undefined}>
      {!editMode && (
        <>
          <Button onClick={() => savePubPost(false)}>Save Draft</Button>
          <Button onClick={() => savePubPost(true)}>Publish</Button>
        </>
      )}
      <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Preview' : 'Edit'}</Button>
    </StyledButtonRow>
  )

  return (
    <>
      {editMode ? (
        <Content>
          {ButtonRow}
          <Input
            label='Title'
            placeholder='Enter title here...'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            label='Tags'
            placeholder='Enter tags here...(react,typescript)'
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <TextArea value={content} onChange={e => setContent(e.target.value)} color={surfaceColor} />
        </Content>
      ) : (
        <StyledPostContent>
          {ButtonRow}
          <PostContent title={title} content={serverContent} created={moment().toLocaleString()} tags={serverTags} />
        </StyledPostContent>
      )}
    </>
  )
}
