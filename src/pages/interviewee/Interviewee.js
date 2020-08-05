import React from 'react'
import { Grid, Typography, Button, Paper } from '@material-ui/core'
import Header from '../../components/Header'
import Calendar from 'react-calendar'
import './Interviewee.css'

import { makeStyles } from '@material-ui/core/styles'
import InterviewTimes from '../../components/InterviewTimes'

const useStyles = makeStyles(() => ({
  center: {
    textAlign: 'center'
  },
  title: {
    marginTop: 20,
    paddingBottom: 40,
    textAlign: 'center'
  },
  textContainer: {
    minHeight: 200
  }
}))

const Interviewee = props => {
  const classes = useStyles()
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item container justify='center' alignItems='center' spacing={5}>
        <Grid
          item
          container
          direction='column'
          alignItems='center'
          justify='space-around'
          className={classes.textContainer}
        >
          <Grid item>
            <Typography variant='h3'>This is the interviewee page</Typography>
          </Grid>
          <Grid item>
            <Typography variant='p'>
              1. Click a day on the calendar to display all the available times
              during that day.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='p'>
              2. Click on all your available times during that specific day.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container sm={12} md={6} justify='center'>
          <Grid item>
            <Paper elevation='3'>
              <Calendar />
            </Paper>
          </Grid>
        </Grid>
        <Grid item container sm={12} md={6} justify='center'>
          <Grid item>
            <InterviewTimes />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Button variant='contained' color='primary' fullWidth>
            Submit times
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Interviewee
