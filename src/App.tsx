import { useContext } from 'react'
import { ThemeContext } from '.'
import { Header } from './components'

function App() {
  const theme = useContext(ThemeContext)
  const bodyStyles = document.body.style
  bodyStyles.backgroundColor = theme.backgroundColor
  bodyStyles.color = theme.darkText

  return (
    <>
      <Header />
      <h1>App</h1>
    </>
  )
}

export default App
