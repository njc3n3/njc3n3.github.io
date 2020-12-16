import { AnchorHTMLAttributes, ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../..'
import { transitionMixin } from '../../styles'

const StyledLink = styled.a<{ color: string; hoverColor: string }>`
  color: ${({ color }) => color};
  text-decoration: none;

  ${transitionMixin('color')}
  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`

type Props = {
  children?: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function Link({ children, ...props }: Props) {
  const { darkSubtitleText, darkText } = useContext(ThemeContext)
  return (
    <StyledLink color={darkSubtitleText} hoverColor={darkText} {...props}>
      {children}
    </StyledLink>
  )
}
