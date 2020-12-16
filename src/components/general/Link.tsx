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
  color?: string
  hoverColor?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function Link({ children, color, hoverColor, ...props }: Props) {
  const { darkSubtitleText, darkText } = useContext(ThemeContext)
  return (
    <StyledLink color={color ?? darkSubtitleText} hoverColor={hoverColor ?? darkText} {...props}>
      {children}
    </StyledLink>
  )
}
