import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '../../..'

function progressBarMixin(interval: number) {
  return css`
    width: ${(interval / 3) * 100}%;
  `
}

const Container = styled.div<{ color: string; progressColor: string; levelColor: string }>`
  margin-bottom: 1rem;
  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .skill {
    font-weight: 600;
  }
  .level {
    color: ${({ levelColor }) => levelColor};
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  .bar {
    background-color: ${({ color }) => color};
    height: 1rem;
  }
  .amount {
    height: 100%;
    background-color: ${({ progressColor }) => progressColor};
    ${progressBarMixin(1)};
    &.intermediate {
      ${progressBarMixin(2)};
    }
    &.advanced {
      ${progressBarMixin(3)};
    }
  }
`

export type Props = {
  name: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export default function SkillProgress({ name, level = 'Beginner' }: Props) {
  const { darkText, primaryColor, darkSubtitleText } = useContext(ThemeContext)

  return (
    <Container color={primaryColor} progressColor={darkText} levelColor={darkSubtitleText}>
      <div className='info'>
        <p className='skill'>{name}</p>
        <p className='level'>{level}</p>
      </div>
      <div className='bar'>
        <div className={`amount ${level.toLocaleLowerCase()}`}></div>
      </div>
    </Container>
  )
}
