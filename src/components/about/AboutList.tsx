import { ReactNode, useContext } from 'react'
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
    margin-bottom: 1rem;
    padding-left: 2.5rem;
  }
  li {
    margin-bottom: 0.5rem;
  }
  :last-child {
    margin-bottom: 0;
  }
`

type Props = {
  header: string
  subheader: string | ReactNode
  items: string[]
}

export default function AboutList({ header, subheader, items }: Props) {
  const { darkSubtitleText } = useContext(ThemeContext)

  return (
    <Container subtitleColor={darkSubtitleText}>
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
