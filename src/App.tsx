import { useContext } from 'react'
import { ThemeContext } from '.'

function App() {
  const theme = useContext(ThemeContext)
  const bodyStyles = document.body.style
  bodyStyles.backgroundColor = theme.backgroundColor
  bodyStyles.color = theme.darkText

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
