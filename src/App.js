import React from 'react'
import {
  ThemeProvider,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import 'react-calendar/dist/Calendar.css'
import Interviewee from './pages/Interviewee'
import Interviewer from './pages/Interviewer'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import lightGreen from '@material-ui/core/colors/lightGreen'
import purple from '@material-ui/core/colors/purple'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import StickyFooter from './pages/StickyFooter'
import EnhancedTable from './EnhancedTable'

// import SignIn from './pages/SignIn'

function App () {
  const theme = createMuiTheme({
    palette: {
      //   type: 'dark'
      //   primary: lightGreen
      // secondary: purple
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/interviewee' component={Interviewee} />
            <Route path='/interviewer' component={Interviewer} />

            {/* <ProtectedRoute path='/interviewee' component={Interviewee} /> */}
            {/* <ProtectedRoute path='/interviewer' component={Interviewer} /> */}
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
