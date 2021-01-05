import { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { ThemeContext } from '..'
import profile from '../assets/profile.jpg'
import { largeScreenMixin, transitionMixin } from '../styles'
import { Link, Modal } from './general'
import { Login } from './'

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

const LargeImageStyles = css`
  margin-left: 10rem;
`

const StyledImage = styled.div<{ backColor: string }>`
  cursor: pointer;
  background-color: transparent;
  height: 15rem;
  width: 15rem;
  border-radius: 50rem;

  .inner {
    position: relative;
    transform-style: preserve-3d;
    ${transitionMixin('transform')}
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
  }
  .front {
    img {
      height: 15rem;
      border-radius: 50rem;
    }
  }
  .back {
    height: 15rem;
    border-radius: 50rem;
    transform: rotateY(180deg);
    background-color: ${({ backColor }) => backColor};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${transitionMixin('transform')}
  &.flip .inner {
    transform: rotateY(180deg);
  }
  ${largeScreenMixin(LargeImageStyles)}
`

const StyledLink = styled(RouterLink)`
  text-decoration: none;
`

export default function Header() {
  const { darkText, surfaceColor, darkSubtitleText, minScreenWidth, backgroundColor } = useContext(ThemeContext)
  const [flipImage, setFlipImage] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <>
      <Spacer color={darkText} />
      <StyledHeader backgroundColor={surfaceColor} titleColor={darkSubtitleText} minScreenWidth={minScreenWidth}>
        <StyledImage
          onClick={() => setFlipImage(!flipImage)}
          className={flipImage ? 'flip' : undefined}
          backColor={backgroundColor}
        >
          <div className='inner'>
            <div className='front'>
              <img src={profile} alt='Profile' />
            </div>
            <div className='back'>
              <Link onClick={() => setIsLoginOpen(true)}>
                <h3>Login</h3>
              </Link>
            </div>
          </div>
        </StyledImage>
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
      <Modal isOpen={isLoginOpen} close={() => setIsLoginOpen(false)}>
        <Login />
      </Modal>
    </>
  )
}
