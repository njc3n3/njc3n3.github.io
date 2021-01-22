import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PostType } from '.'
import { AuthContext } from '../App'
import { PostEditor } from '../components/posts'
import { useQuery } from '../hooks'

export default function EditDraft() {
  const { getToken } = useContext(AuthContext)
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<PostType>(`posts/drafts?id=${id}`, undefined, getToken() || undefined)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h2>Loading...</h2>
  } else if (data) {
    content = <PostEditor post={data} />
  }

  return <>{content}</>
}
