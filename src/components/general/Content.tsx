import { HTMLAttributes, ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../index'

const StyledContent = styled.section<{ color: string; padding: string }>`
  background-color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
`

type Props = {
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

export default function Content({ children, ...props }: Props) {
  const { surfaceColor, mainSpacingRem } = useContext(ThemeContext)
  return (
    <StyledContent color={surfaceColor} padding={mainSpacingRem} {...props}>
      {children}
    </StyledContent>
  )
}
