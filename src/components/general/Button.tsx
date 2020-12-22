import { ButtonHTMLAttributes, ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../index'
import { transitionMixin } from '../../styles'

const StyledButton = styled.button<{ color: string; textColor: string; hoverColor: string }>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ color }) => color};
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.5rem 1rem;
  ${transitionMixin('background-color')}
  :hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`

type Props = {
  children?: ReactNode
  color?: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, color = 'primary', ...props }: Props) {
  const { darkText, surfaceColor, primaryColor } = useContext(ThemeContext)
  return (
    <StyledButton
      color={color === 'primary' ? darkText : primaryColor}
      hoverColor={color === 'primary' ? primaryColor : darkText}
      textColor={surfaceColor}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
