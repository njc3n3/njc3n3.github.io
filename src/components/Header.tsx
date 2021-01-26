import { Fragment, useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { ThemeContext } from '..'
import profile from '../assets/profile.jpg'
import { largeScreenMixin, transitionMixin } from '../styles'
import { Link, Modal } from './general'
import { Login } from './'
import { AuthContext } from '../App'

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

export const StyledLink = styled(RouterLink)<{ color: string; hover: string }>`
  color: ${({ color }) => color};
  text-decoration: none;

  ${transitionMixin('color')}
  &:hover {
    color: ${({ hover }) => hover};
  }
`

export default function Header() {
  const history = useHistory()
  const { isLoggedIn } = useContext(AuthContext)
  const { darkText, surfaceColor, darkSubtitleText, minScreenWidth, backgroundColor, mainSpacingRem } = useContext(
    ThemeContext
  )
  const [flipImage, setFlipImage] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const closeModal = () => setIsLoginOpen(false)

  const links = [
    { to: '/', text: 'About' },
    { to: '/posts', text: 'Posts' }
  ]

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
              {isLoggedIn() ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                  }}
                >
                  <StyledLink
                    to='/add-post'
                    color={darkSubtitleText}
                    hover={darkText}
                    style={{ fontWeight: 'bold', fontSize: '1.15rem', marginBottom: mainSpacingRem }}
                  >
                    Add Post
                  </StyledLink>
                  <Link
                    onClick={() => {
                      localStorage.clear()
                      history.push('/')
                    }}
                  >
                    <h3>Logout</h3>
                  </Link>
                </div>
              ) : (
                <Link onClick={() => setIsLoginOpen(true)}>
                  <h3>Login</h3>
                </Link>
              )}
            </div>
          </div>
        </StyledImage>
        <div className='info'>
          <p className='name'>Nick Coffey</p>
          <p className='title'>Frontend Engineer</p>
          <div className='links'>
            {links.map(({ to, text }, index) => (
              <Fragment key={index}>
                <StyledLink to={to} color={darkSubtitleText} hover={darkText}>
                  {text}
                </StyledLink>
                {index < links.length - 1 ? ' | ' : null}
              </Fragment>
            ))}
          </div>
        </div>
      </StyledHeader>
      <Modal isOpen={isLoginOpen} close={closeModal}>
        <Login closeModal={closeModal} />
      </Modal>
    </>
  )
}
