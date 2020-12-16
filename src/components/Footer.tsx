import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faDev, faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '..'
import { largeScreenMixin } from '../styles'
import { Link } from './general'

const LargeFooterStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-icons {
    margin-left: 1rem;
  }
`
const StyledFooter = styled.footer<{ color: string; textColor: string }>`
  text-align: center;
  padding: 0.5rem 0;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  font-size: 0.85rem;

  .footer-icons {
    a {
      margin-right: 1rem;
      font-size: 1.75rem;
    }
    :last-child {
      margin-right: 0;
    }
  }

  ${largeScreenMixin(LargeFooterStyles)}
`

export default function Footer() {
  const { darkText, surfaceColor, primaryColor } = useContext(ThemeContext)

  const SocialLink = ({ link, icon }: { link: string; icon: IconProp }) => (
    <Link href={`https://www.${link}`} color={surfaceColor} hoverColor={primaryColor}>
      <FontAwesomeIcon icon={icon} />
    </Link>
  )

  return (
    <StyledFooter color={darkText} textColor={surfaceColor}>
      Designed by Nick Coffey
      <div className='footer-icons'>
        <SocialLink link='linkedin.com/in/nicholasjcoffey' icon={faLinkedin} />
        <SocialLink link='github.com/nickcoffey' icon={faGithubSquare} />
        <SocialLink link='dev.to/nickcoffey' icon={faDev} />
      </div>
    </StyledFooter>
  )
}
