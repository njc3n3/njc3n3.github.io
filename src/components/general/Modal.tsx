import { HTMLAttributes, ReactNode, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../index'
import { transitionMixin } from '../../styles'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  opacity: 0;
  visibility: hidden;
  ${transitionMixin('visibility, opacity')}
  &.isOpen {
    visibility: visible;
    opacity: 1;
  }
`

const StyledModal = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  cursor: default;
`

type Props = {
  isOpen: boolean
  close: () => void
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

export default function Modal({ isOpen, close, children, ...props }: Props) {
  const { surfaceColor } = useContext(ThemeContext)
  return (
    <Background onClick={() => close()} className={isOpen ? 'isOpen' : 'isClosed'}>
      <StyledModal onClick={e => e.stopPropagation()} color={surfaceColor} {...props}>
        {children}
      </StyledModal>
    </Background>
  )
}
