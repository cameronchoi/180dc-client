import React, { useState } from 'react'
import { Grid, Typography, Button, Paper, Container } from '@material-ui/core'
import Header from '../../components/Header'
import Calendar from 'react-calendar'
import './Interviewee.css'

import times from './times'

import { makeStyles } from '@material-ui/core/styles'
import InterviewTimes from '../../components/InterviewTimes'

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
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    backgroundColor: 'black',
    marginTop: 'auto'
  }
}))

const Interviewee = props => {
  const classes = useStyles()
  const [selectedTimes, setSelectedTimes] = useState([])
  const [numSelected, setNumSelected] = useState(0)

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      //   console.log(rows)
      const newSelecteds = times.map(n => n.id)
      setSelectedTimes(newSelecteds)
      return
    }
    setSelectedTimes([])
  }

  return (
    <div className={classes.overflowHide}>
      <Grid container direction='column' spacing={5}>
        <Grid item>
          <Header history={props.history} />
        </Grid>
        <Grid item container direction='column' spacing={3}>
          <Grid item xs={12} className={classes.center}>
            <Typography variant='h4'>Enter your available times</Typography>
          </Grid>
          <Grid item xs={12} className={classes.smallText}>
            <Typography variant='p'>
              1. Click a day on the calendar to display all the available times
              during that day.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.smallText}>
            <Typography variant='p'>
              2. Click on all your available times during that specific day.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify='center' alignItems='center'>
          <Grid item container md={12} lg={5} justify='center'>
            <Grid item>
              <Paper elevation='3'>
                <Calendar />
              </Paper>
            </Grid>
          </Grid>
          <Grid item container md={12} lg={5} justify='center'>
            <Grid item className={classes.table}>
              <InterviewTimes
                times={times}
                handleSelectAllClick={handleSelectAllClick}
                rowCount={times.length}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              className={classes.submitButton}
              size='large'
            >
              Submit times
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <footer className={classes.footer}>
        <Container>
          <Typography color='primary'>This is my footer</Typography>
        </Container>
      </footer>
    </div>
  )
}

export default Interviewee
