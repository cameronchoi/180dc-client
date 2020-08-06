import React from 'react'
import {
  ThemeProvider,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import 'react-calendar/dist/Calendar.css'
import Interviewee from './pages/interviewee/Interviewee'
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

const theme = createMuiTheme({
  //   palette: {
  //     primary: lightGreen,
  //     secondary: purple
  //   }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/interviewee' component={Interviewee} />
          <Route path='/foot' component={StickyFooter} />
          <Route path='/enhancedtable' component={EnhancedTable} />

          {/* <ProtectedRoute path='/interviewee' component={Interviewee} /> */}
          <ProtectedRoute path='/interviewer' component={Interviewer} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
