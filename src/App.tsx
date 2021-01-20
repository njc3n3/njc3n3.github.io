import { createContext, useContext } from 'react'
import styled, { css } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import { ThemeContext } from '.'
import { Header, Footer, PrivateRoute } from './components'
import { AddPost, About, Posts, Post } from './pages'
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

function isLoggedIn() {
  let loggedIn = false
  const token = localStorage.getItem('token')
  if (token) {
    loggedIn = !isExpired(token)
  }
  return loggedIn
}

export const AuthContext = createContext({ isLoggedIn })

function App() {
  const { backgroundColor, darkText, mainSpacing } = useContext(ThemeContext)
  const bodyStyles = document.body.style
  bodyStyles.backgroundColor = backgroundColor
  bodyStyles.color = darkText

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
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
            <PrivateRoute exact path='/add-post'>
              <AddPost />
            </PrivateRoute>
            <Redirect to='/' />
          </Switch>
        </StyledMain>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
