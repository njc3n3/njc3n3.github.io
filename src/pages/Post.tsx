import moment from 'moment'
import React, { ReactNode, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'
import { PostType } from '.'
import { ThemeContext } from '..'
import { Content } from '../components/general'
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

const Title = styled.h1<{ spacing: string }>`
  font-size: 250%;
  font-weight: 100;
  margin-bottom: ${({ spacing }) => spacing};
`

const HRule = styled.div<{ color: string; spacing: number }>`
  background-color: ${({ color }) => color};
  padding: 1px 0px;
  border: none;
  margin: ${({ spacing }) => spacing}rem 0;
`

const ConvertedMarkdown = styled.div<{ spacing: number; accentColor: string }>`
  all: initial;
  * {
    all: revert;
  }

  font-family: 'Open Sans', sans-serif;
  margin-top: ${({ spacing }) => spacing * 2}rem;

  h1 {
    font-size: 175%;
  }
  hr {
    background-color: ${({ accentColor }) => accentColor};
    margin: ${({ spacing }) => spacing}rem 0;
    padding: 0.5px 0px;
    border: none;
  }
  blockquote {
    border-left: 6px solid ${({ accentColor }) => accentColor};
    padding: 1px 0;
    padding-left: ${({ spacing }) => spacing}rem;
    margin: ${({ spacing }) => spacing}rem 0;
  }

  p code {
    background-color: ${({ accentColor }) => accentColor};
    padding: 2px;
    font-weight: bold;
    color: black;
  }
  ul {
    padding-left: ${({ spacing }) => spacing * 2}rem;
  }
  ol {
    padding-left: ${({ spacing }) => spacing * 2}rem;
  }
`

const renderers = {
  code: ({ language, value }: { language?: string; value?: ReactNode }) => {
    return value ? <SyntaxHighlighter style={dark} language={language} children={value} /> : <></>
  }
}

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<PostType>(`posts?id=${id}`)
  const { darkSubtitleText, mainSpacing, primaryColor } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h2>Loading...</h2>
  } else if (data) {
    const { title, created, tags, content: contentBody } = data
    const calcSpacing = `${mainSpacing / 2}rem`

    content = (
      <>
        <Title spacing={calcSpacing}>{title}</Title>
        <p style={{ marginBottom: calcSpacing }}>{moment(created).format('MMMM Do, YYYY')}</p>
        {tags && (
          <p style={{ color: darkSubtitleText }}>
            {tags.reduce(
              (tagString, tag, index) => (tagString += `#${tag}${index !== tags.length - 1 ? ', ' : ''}`),
              ''
            )}
          </p>
        )}
        <HRule color={darkSubtitleText} spacing={mainSpacing} />
        <ConvertedMarkdown id='markdown' spacing={mainSpacing} accentColor={primaryColor}>
          <ReactMarkdown renderers={renderers}>
            {contentBody.replaceAll('\\n', '\n').replaceAll('\\\\', '\\')}
          </ReactMarkdown>
        </ConvertedMarkdown>
      </>
    )
  }

  return <StyledContent>{content}</StyledContent>
}
