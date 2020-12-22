import { useContext, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeContext } from '.'
import { Header, Footer, Login } from './components'
import { Modal } from './components/general'
import { About, Posts } from './pages'
import { largeScreenMixin } from './styles'

function LargeMainStyles(spacing: number) {
  return css`
    padding: ${spacing * 2}rem ${spacing * 4}rem;
  `
}
const StyledMain = styled.main<{ spacing: number }>`
  padding: ${({ spacing }) => `${spacing * 2}rem ${spacing}rem`};
  ${({ spacing }) => largeScreenMixin(LargeMainStyles(spacing))}
`

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { backgroundColor, darkText, mainSpacing } = useContext(ThemeContext)
  const bodyStyles = document.body.style
  bodyStyles.backgroundColor = backgroundColor
  bodyStyles.color = darkText

  useEffect(() =>
    document.addEventListener(
      'keyup',
      e => {
        if (e.altKey && e.key === 'l') {
          setIsLoginOpen(true)
        }
      },
      false
    )
  )

  return (
    <Router>
      <Header />
      <StyledMain spacing={mainSpacing}>
        <Switch>
          <Route exact path='/'>
            <About />
          </Route>
          <Route path='/posts'>
            <Posts />
          </Route>
        </Switch>
        <Modal isOpen={isLoginOpen} close={() => setIsLoginOpen(false)}>
          <Login />
        </Modal>
      </StyledMain>
      <Footer />
    </Router>
  )
}

export default App
