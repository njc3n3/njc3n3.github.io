import React, { createElement, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { PostType } from '.'
import { Content } from '../components/general'
import { useQuery } from '../hooks'

function getJSX(tag: string, text: string = '', src?: string) {
  let element = <></>
  if (tag === 'img' && src) {
    element = createElement(tag, { src, width: '50%', style: { borderRadius: '0.25rem' } })
  } else if (tag === 'a' && src) {
    element = createElement(tag, { href: src }, text)
  } else if (tag === 'br') {
    element = createElement(tag)
  } else {
    element = createElement(tag, null, text)
  }

  return element
}

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<PostType>(`posts?id=${id}`)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h2>Loading...</h2>
  } else {
    content = (
      <>
        <h1 style={{ textAlign: 'center' }}>{data?.title}</h1>
        {data?.content.map(({ tag, text, src }, index) => (
          <Fragment key={index}>{getJSX(tag, text, src)}</Fragment>
        ))}
      </>
    )
  }

  return <Content>{content}</Content>
}
