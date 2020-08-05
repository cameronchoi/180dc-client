import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Header from '../components/Header'
import Calendar from 'react-calendar'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {})

const Interviewer = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item />
        <Calendar />
        <Grid item>
          <Typography>This is the Interviewer page</Typography>
        </Grid>
        <Grid item />
      </Grid>
    </Grid>
  )
}

export default Interviewer
