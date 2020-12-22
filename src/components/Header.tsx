import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { ThemeContext } from '..'
import profile from '../assets/profile.jpg'
import { largeScreenMixin } from '../styles'
import { Link } from './general'

type StyledHeaderProps = {
  backgroundColor: string
  titleColor: string
  minScreenWidth: string
}

const Spacer = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 0.5rem;
`

const LargeHeaderStyles = css`
  flex-direction: row;
  img {
    margin-left: 10rem;
  }

  .info {
    margin-left: 2.5rem;
    text-align: left;
  }
`
const StyledHeader = styled.header<StyledHeaderProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  img {
    height: 15rem;
    border-radius: 50rem;
  }
  .info {
    margin-top: 1rem;
    text-align: center;
  }
  .name {
    font-size: 3rem;
  }
  .title {
    font-size: 1.5rem;
    color: ${({ titleColor }) => titleColor};
  }
  .links {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.15rem;
  }

  ${largeScreenMixin(LargeHeaderStyles)}
`

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`

export default function Header() {
  const { darkText, surfaceColor, darkSubtitleText, minScreenWidth } = useContext(ThemeContext)

  return (
    <>
      <Spacer color={darkText} />
      <StyledHeader backgroundColor={surfaceColor} titleColor={darkSubtitleText} minScreenWidth={minScreenWidth}>
        <img src={profile} alt='Profile' />
        <div className='info'>
          <p className='name'>Nick Coffey</p>
          <p className='title'>Frontend Engineer</p>
          <div className='links'>
            <StyledLink to='/'>
              <Link>About</Link>
            </StyledLink>
            {' | '}
            <StyledLink to='/posts'>
              <Link>Posts</Link>
            </StyledLink>
          </div>
        </div>
      </StyledHeader>
    </>
  )
}
