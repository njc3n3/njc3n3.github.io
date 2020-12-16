import { ReactNode, useContext, CSSProperties } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../..'

const Container = styled.div<{ subtitleColor: string }>`
  h4 {
    margin-bottom: 1rem;
    span {
      color: ${({ subtitleColor }) => subtitleColor};
    }
  }
  ul {
    padding-left: 2.5rem;
  }
  li {
    margin-bottom: 0.5rem;
    :last-of-type {
      margin-bottom: 0;
    }
  }
`

export type Props = {
  header: string
  subheader: string | ReactNode
  items: string[]
  style?: CSSProperties
}

export default function AboutList({ header, subheader, items, style }: Props) {
  const { darkSubtitleText } = useContext(ThemeContext)

  return (
    <Container subtitleColor={darkSubtitleText} style={style}>
      <h4>
        {header} - <span>{subheader}</span>
      </h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Container>
  )
}
