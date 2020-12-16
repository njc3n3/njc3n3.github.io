import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../..'
import AboutContent from './AboutContent'

type StyleProps = { color: string }

const Container = styled.div<StyleProps>`
  display: flex;
  .school {
    display: flex;
    flex-direction: column;
  }
  .name {
    color: ${({ color }) => color};
  }
`

const StyledIcon = styled(FontAwesomeIcon)<StyleProps>`
  margin-right: 1rem;
  color: ${({ color }) => color};
`

export default function Education() {
  const { darkSubtitleText } = useContext(ThemeContext)

  return (
    <AboutContent header='Education'>
      <Container color={darkSubtitleText}>
        <div>
          <StyledIcon icon={faGraduationCap} color={darkSubtitleText} />
        </div>
        <div className='school'>
          <h4>Bachelor of Science in Information Systems</h4>
          <p className='name'>University of Missouri Saint-Louis</p>
        </div>
      </Container>
    </AboutContent>
  )
}
