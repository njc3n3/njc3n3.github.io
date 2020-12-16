import { faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../..'
import { Link } from '../general'
import AboutContent from './AboutContent'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 0.5rem;
  }
`

const StyledIcon = styled(FontAwesomeIcon)<{ color: string }>`
  margin-right: 0.5rem;
  color: ${({ color }) => color};
`

export default function ContactMe() {
  const { darkSubtitleText } = useContext(ThemeContext)

  return (
    <AboutContent header='Contact Me'>
      <Container>
        <p>
          <StyledIcon icon={faMapMarkerAlt} color={darkSubtitleText} /> St. Louis, MO
        </p>
        <p>
          <StyledIcon icon={faEnvelope} color={darkSubtitleText} />
          <Link href='mailto:nicholasjcoffey@gmail.com'>nicholasjcoffey@gmail.com</Link>
        </p>
      </Container>
    </AboutContent>
  )
}
