import React from 'react'
import {
  ThemeProvider,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { Grid, Paper, CssBaseline } from '@material-ui/core'

import 'react-calendar/dist/Calendar.css'
import Interviewee from './pages/Interviewee'
import Interviewer from './pages/Interviewer'
import Login from './pages/Login'
import SignIn from './pages/Login'
import NotFound from './pages/NotFound'
import lightGreen from '@material-ui/core/colors/lightGreen'
import purple from '@material-ui/core/colors/purple'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import StickyFooter from './pages/StickyFooter'
import EnhancedTable from './EnhancedTable'
import { InterviewProvider } from './contexts/InterviewContext'
import SelectedTimesPage from './pages/Allocation'
import Allocation from './pages/Allocation'

// import SignIn from './pages/SignIn'

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
        <Router>
          <InterviewProvider>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/interviewee' component={Interviewee} />
              <Route path='/interviewer' component={Interviewer} />
              <Route path='/allocation' component={Allocation} />
              <Route path='/footer' component={StickyFooter} />

              {/* <ProtectedRoute path='/interviewee' component={Interviewee} /> */}
              {/* <ProtectedRoute path='/interviewer' component={Interviewer} /> */}
              <Route path='*' component={NotFound} />
            </Switch>
          </InterviewProvider>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
