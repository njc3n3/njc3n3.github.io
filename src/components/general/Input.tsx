import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../index'

const Container = styled.div<{ labelColor: string; errorColor: string }>`
  display: flex;
  flex-direction: column;
  label {
    color: ${({ labelColor }) => labelColor};
    font-size: 0.85rem;
    font-weight: bolder;
  }
  span {
    color: ${({ errorColor }) => errorColor};
    font-size: 0.85rem;
  }
  span::before {
    content: 'Error: ';
    font-weight: bolder;
  }
`

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
`

type Props = {
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, style, ...props }, ref) => {
  const { primaryColor, errorColor } = useContext(ThemeContext)
  return (
    <Container labelColor={primaryColor} errorColor={errorColor} style={style}>
      {label && <label>{label}</label>}
      <StyledInput ref={ref} {...props} />
      {error && <span>{error}</span>}
    </Container>
  )
})

export default Input
