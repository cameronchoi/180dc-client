import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Paper, CssBaseline } from '@material-ui/core'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'react-calendar/dist/Calendar.css'
import SelectTimes from './pages/SelectTimes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Allocation from './pages/Allocation'
import LoginRoute from './components/LoginRoute'
import UserDetails from './pages/UserDetails'
import { AuthProvider } from './contexts/AuthContext'

function App () {
  const theme = createMuiTheme({
    typography: {
      // Use the system font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont'].join(',')
    },
    palette: {
      primary: {
        light: '#5dd7a9',
        main: '#1da57a',
        dark: '#00754e',
        contrastText: '#ffffff'
      },
      secondary: {
        light: '#2a3a50',
        main: '#001428',
        dark: '#000000',
        contrastText: '#ffffff'
      }
      //   type: 'dark'
      //   primary: lightGreen
      // secondary: purple
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1430,
        xl: 1920
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <AuthProvider>
          <Router>
            <Switch>
              <LoginRoute path='/login' component={Login} />
              <ProtectedRoute path='/allocation' component={Allocation} />
              <ProtectedRoute exact path='/' component={UserDetails} />
              <ProtectedRoute path='/times' component={SelectTimes} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </Paper>
    </ThemeProvider>
  )
}

export default App
