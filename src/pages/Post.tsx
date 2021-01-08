import React, { createElement, Fragment, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { PostType } from '.'
import { ThemeContext } from '..'
import { Content, Link } from '../components/general'
import { useQuery } from '../hooks'
import { largeScreenMixin } from '../styles'

const LargeContentStyles = css`
  padding: 5% 15%;
`
const StyledContent = styled(Content)`
  overflow-wrap: break-word;
  padding: 5% initial;
  ${largeScreenMixin(LargeContentStyles)}
`

const HeaderImage = styled.img`
  width: 100%;
`

const Title = styled.h1`
  font-size: 250%;
  font-weight: 100;
`
const Subtitle = styled.h3<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 150%;
  font-weight: 100;
  margin-bottom: 1rem;
`

const HRule = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 1px;
  margin: 2rem 0;
`

const LargeImageStyles = css`
  width: 75%;
`
const StyledImage = styled.img`
  width: 90%;
  border-radius: 0.25rem;
  margin: 0 auto;
  display: block;
  ${largeScreenMixin(LargeImageStyles)}
`

function getJSX(tag: string, text: string = '', src?: string) {
  let element = <></>
  if (tag === 'img' && src) {
    element = <StyledImage src={src} />
  } else if (tag === 'h2') {
    element = <h2 style={{ fontSize: '125%' }}>{text}</h2> // reset size
  } else if (tag === 'a' && src) {
    element = (
      <Link href={src}>
        <strong>{text}</strong>
      </Link>
    )
  } else if (tag === 'br') {
    element = <br />
  } else {
    element = createElement(tag, null, text)
  }

  return element
}

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<PostType>(`posts?id=${id}`)
  const { darkSubtitleText } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h2>Loading...</h2>
  } else if (data) {
    content = (
      <>
        <Title>{data.title}</Title>
        <Subtitle color={darkSubtitleText}>{data.subtitle}</Subtitle>
        <HeaderImage src={data.titleImg} />
        <HRule color={darkSubtitleText} />
        {data?.content.map(({ tag, text, src }, index) => (
          <Fragment key={index}>{getJSX(tag, text, src)}</Fragment>
        ))}
      </>
    )
  }

  return <StyledContent>{content}</StyledContent>
}
