import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '..'
import { AboutMe, ContactMe, Education, PastProjects, TechnicalSkills, WorkExperience } from '../components/about'
import { largeScreenMixin } from '../styles'

function LargeContainerStyles(spacing: string) {
  return css`
    flex-direction: row;
    .left-top {
      flex: 2;
      margin-right: ${spacing};
    }
    .right-bottom {
      flex: 1;
    }
  `
}
const Container = styled.div<{ spacing: string }>`
  display: flex;
  flex-direction: column;
  section {
    margin-bottom: ${({ spacing }) => spacing};
  }
  :last-child {
    margin-bottom: 0;
  }
  ${({ spacing }) => largeScreenMixin(LargeContainerStyles(spacing))}
`

export default function About() {
  const { mainSpacingRem } = useContext(ThemeContext)

  return (
    <Container spacing={mainSpacingRem}>
      <div className='left-top'>
        <AboutMe />
        <PastProjects />
        <WorkExperience />
      </div>
      <div className='right-bottom'>
        <ContactMe />
        <TechnicalSkills />
        <Education />
      </div>
    </Container>
  )
}
