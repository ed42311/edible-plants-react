import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'

// Styles
import './index.css'
import 'typeface-roboto'

// Config and Globals
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue, indigo, red } from '@material-ui/core/colors'
import { BrowserRouter as Router } from 'react-router-dom'

// Comps
import App from './App'

const custTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={custTheme}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
