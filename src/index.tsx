import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { theme } from './styles'

export const ThemeContext = createContext(theme)

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
