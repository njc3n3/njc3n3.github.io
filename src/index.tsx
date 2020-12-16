import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const theme = {
  primaryColor: ' #909e9b',
  backgroundColor: ' #cce3de',
  surfaceColor: '#f6fff8',
  darkText: '#302f2f',
  darkSubtitleText: '#302f2fa8'
}

export const ThemeContext = createContext(theme)

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
