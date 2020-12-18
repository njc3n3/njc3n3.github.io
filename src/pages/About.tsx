import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '..'
import { AboutMe, ContactMe, Education, PastProjects, TechnicalSkills, WorkExperience } from '../components/about'
import { largeScreenMixin } from '../styles'

const noBottomMarginMixin = css`
  section {
    :last-of-type {
      margin-bottom: 0;
    }
  }
`

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
    ${noBottomMarginMixin};
  `
}
const Container = styled.div<{ spacing: string }>`
  display: flex;
  flex-direction: column;
  section {
    margin-bottom: ${({ spacing }) => spacing};
  }
  .right-bottom {
    ${noBottomMarginMixin};
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
