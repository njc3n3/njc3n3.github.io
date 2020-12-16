import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  h4 {
    margin-bottom: 1rem;
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
  return (
    <Container>
      <h4>
        {header} - {subheader}
      </h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Container>
  )
}
