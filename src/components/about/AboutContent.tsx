import { ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../..'
import { Content } from '../general'

const StyledHeader = styled.header<{ color: string }>`
  font-size: 1.5rem;
  padding-bottom: 1rem;
  color: ${({ color }) => color};
  text-align: center;
`

type Props = {
  header: string
  children: ReactNode
}

export default function AboutContent({ header, children }: Props) {
  const { darkSubtitleText } = useContext(ThemeContext)

  return (
    <Content>
      <StyledHeader color={darkSubtitleText}>{header}</StyledHeader>
      {children}
    </Content>
  )
}
