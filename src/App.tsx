import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeContext } from '.'
import { Header, Footer } from './components'
import { About, Posts, Post } from './pages'
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
  const { backgroundColor, darkText, mainSpacing } = useContext(ThemeContext)
  const bodyStyles = document.body.style
  bodyStyles.backgroundColor = backgroundColor
  bodyStyles.color = darkText

  return (
    <Router>
      <Header />
      <StyledMain spacing={mainSpacing}>
        <Switch>
          <Route exact path='/'>
            <About />
          </Route>
          <Route exact path='/posts'>
            <Posts />
          </Route>
          <Route exact path='/posts/:id'>
            <Post />
          </Route>
        </Switch>
      </StyledMain>
      <Footer />
    </Router>
  )
}

export default App
