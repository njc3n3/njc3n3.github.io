import React from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { PostType } from '.'
import { Content } from '../components/general'
import { useQuery } from '../hooks'
import { largeScreenMixin } from '../styles'
import { PostContent } from '../components/posts'

const LargeContentStyles = css`
  padding: 5% 15%;
`
export const StyledContent = styled(Content)`
  overflow-wrap: break-word;
  padding: 5% initial;
  ${largeScreenMixin(LargeContentStyles)}
`

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<PostType>(`posts?id=${id}`)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h2>Loading...</h2>
  } else if (data) {
    const { id, updated, isPublished, ...restPost } = data

    content = <PostContent {...restPost} />
  }

  return <StyledContent>{content}</StyledContent>
}
