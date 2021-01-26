import { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'
import { ThemeContext } from '../..'
import moment from 'moment'

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

const ConvertedMarkdown = styled.div<{ spacing: number; accentColor: string; color: string }>`
  all: initial;
  * {
    all: revert;
  }

  font-family: 'Open Sans', sans-serif;
  color: ${({ color }) => color};
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

type Props = {
  title: string
  created: string
  tags: string[]
  content: string
}

export default function PostContent({ title, created, tags, content }: Props) {
  const { darkSubtitleText, mainSpacing, primaryColor, darkText } = useContext(ThemeContext)
  const calcSpacing = `${mainSpacing / 2}rem`

  return (
    <>
      <Title spacing={calcSpacing}>{title}</Title>
      <p style={{ marginBottom: calcSpacing }}>{moment(created).format('MMMM Do, YYYY')}</p>
      {tags && (
        <p style={{ color: darkSubtitleText }}>
          {tags.reduce((tagString, tag, index) => (tagString += `#${tag}${index !== tags.length - 1 ? ', ' : ''}`), '')}
        </p>
      )}
      <HRule color={darkSubtitleText} spacing={mainSpacing} />
      <ConvertedMarkdown id='markdown' spacing={mainSpacing} accentColor={primaryColor} color={darkText}>
        <ReactMarkdown renderers={renderers}>{content.replaceAll('\\n', '\n').replaceAll('\\\\', '\\')}</ReactMarkdown>
      </ConvertedMarkdown>
    </>
  )
}
