import { ButtonHTMLAttributes, ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../index'
import { transitionMixin } from '../../styles'

const StyledButton = styled.button<{ color: string; textColor: string; hoverColor: string }>`
  color: ${({ textColor }) => textColor};
  background-color: ${({ color }) => color};
  border: none;
  font-weight: 900;
  cursor: pointer;
  padding: 0.5rem 1rem;
  ${transitionMixin('background-color')}
  :hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`

type Props = {
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: Props) {
  const { darkText, surfaceColor, primaryColor } = useContext(ThemeContext)
  return (
    <StyledButton color={darkText} hoverColor={primaryColor} textColor={surfaceColor} {...props}>
      {children}
    </StyledButton>
  )
}
