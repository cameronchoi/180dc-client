import React from 'react'
import Auth from '../Auth'

import { Grid, Typography, Button } from '@material-ui/core'

const Login = props => {
  const onClickHandler = () => {
    Auth.login(() => {
      props.history.push('/interviewee')
    })
  }
  return (
    <Grid container>
      <Grid item>
        <Typography>This is the login page</Typography>
      </Grid>
      <Grid item>
        <Button onClick={onClickHandler}>Login</Button>
      </Grid>
    </Grid>
  )
}

export default Login
