import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography, Button, Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
import Calendar from 'react-calendar'
import SelectedTimes from '../components/AllocationTable'
import Footer from '../components/Footer'
import './calendar.css'
import { InterviewContext } from '../contexts/InterviewContext'
import AllocationTable from '../components/AllocationTable'

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  table: {
    marginBottom: 30
  },
  submitButton: {
    marginBottom: 30,
    marginTop: 30,
    maxWidth: 300
  },
  smallText: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  overflowHide: {
    overflowX: 'hidden',
    minHeight: '100vh'
  },
  auto: {
    marginTop: 'auto'
  }
}))

const Allocation = props => {
  const classes = useStyles()
  const [interviewState] = useContext(InterviewContext)

  const submitHandler = () => {
    props.history.push('/interviewee')
  }

  return (
    <Grid
      container
      className={classes.overflowHide}
      direction='column'
      justify='space-between'
    >
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item alignItems='center' direction='column'>
        <Grid item xs={12} className={classes.center}>
          <Typography variant='h4' className={classes.table}>
            Interview Allocation
          </Typography>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Grid item className={classes.table}>
            <AllocationTable allocations={interviewState.allocatedTime} />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            onClick={submitHandler}
            variant='contained'
            color='primary'
            fullWidth
            className={classes.submitButton}
            size='large'
          >
            Redo Time Selection
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default Allocation
