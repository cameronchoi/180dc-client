import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography, Button, Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { differenceInCalendarDays } from 'date-fns'
import Header from '../components/Header'
import Calendar from 'react-calendar'
import InterviewTimes from '../components/InterviewTimes'
import Footer from '../components/Footer'
import './calendar.css'
import { InterviewContext } from '../contexts/InterviewContext'

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    maxWidth: 300
  },
  text: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  lastText: {
    textAlign: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  root: {
    overflowX: 'hidden',
    minHeight: '100vh'
  },
  margin: {
    marginBottom: 40
  }
}))

const Interviewee = props => {
  const classes = useStyles()
  const [interviewState, interviewDispatch] = useContext(InterviewContext)

  const [availableTimes, setAvailableTimes] = useState([])
  const [dayTimes, setDayTimes] = useState([])
  const [date, setDate] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const onChangeHandler = nextDate => {
    setDate(nextDate)
    let currentDayTimes = availableTimes.filter(time =>
      isSameDay(time.date, nextDate)
    )
    setDayTimes(currentDayTimes)
  }

  const submitHandler = () => {
    let sendTimes = []
    availableTimes.forEach(time => {
      if (time.selected) {
        sendTimes.push(time.dateTime)
      }
    })
    if (sendTimes.length < 2 && availableTimes.length > 1) {
      return alert('Please select at least two times')
    } else {
      fetch('http://127.0.0.1:8000/api/intervieweetimes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          availableTimes: sendTimes
        })
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.errors) {
            alert(
              'Something went wrong... Please refresh your page and try again'
            )
          } else {
            console.log(resData)
            interviewDispatch({ type: 'SUBMIT_TIME', time: [resData] })
            props.history.push('/allocation')
          }
        })
        .catch(err => {
          console.log(err)
          alert('something went wrong...')
        })
    }
  }

  function isSameDay (a, b) {
    return differenceInCalendarDays(a, b) === 0
  }

  function tileDisabled ({ date, view }) {
    if (view === 'month') {
      let flag = true
      availableTimes.forEach(dDate => {
        if (isSameDay(dDate.date, date)) {
          flag = false
        }
      })
      return flag
    }
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/intervieweetimes')
      .then(res => res.json())
      .then(resData => {
        let times = []
        resData.forEach((time, i) => {
          times.push({
            id: time.id,
            dateTime: time.datetime,
            date: new Date(
              time.datetime.substring(0, time.datetime.length - 1)
            ),
            selected: false,
            index: i
          })
        })
        setAvailableTimes(times)
        setDate(times[0].date)
        setStartDate(times[0].date)
        setEndDate(times[times.length - 1].date)
        let currentDayTimes = times.filter(time =>
          isSameDay(time.date, times[0].date)
        )
        setDayTimes(currentDayTimes)
      })
  }, [])

  const handleClick = index => {
    let newTimes = [...availableTimes]
    newTimes[index].selected = !newTimes[index].selected
    setAvailableTimes(newTimes)
  }

  return (
    <Grid
      container
      className={classes.root}
      direction='column'
      justify='space-between'
    >
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item alignItems='center' direction='column' spacing={10}>
        <Grid item xs={12} className={classes.text}>
          <Typography variant='h4'>Enter your available times</Typography>
        </Grid>
        <Grid item xs={12} className={classes.text}>
          <Typography variant='body1'>
            1. Click a day on the calendar to display all the available times
            during that day.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.lastText}>
          <Typography variant='body1'>
            2. Click on all your available times during that specific day.
          </Typography>
        </Grid>
        <Grid item container justify='center' alignItems='center'>
          <Grid
            item
            container
            md={12}
            lg={5}
            justify='center'
            className={classes.margin}
          >
            <Grid item>
              <Paper elevation={3}>
                <Calendar
                  onChange={onChangeHandler}
                  value={date}
                  minDate={startDate}
                  maxDate={endDate}
                  tileDisabled={tileDisabled}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={12}
            lg={5}
            justify='center'
            className={classes.margin}
          >
            <Grid item className={classes.table}>
              <InterviewTimes times={dayTimes} handleClick={handleClick} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            onClick={submitHandler}
            variant='contained'
            color='primary'
            fullWidth
            className={classes.submitButton}
            size='large'
          >
            Submit Times
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>

    //   <Grid item container>
    //     <Grid item container direction='column' spacing={3}>
    //       <Grid item xs={12} className={classes.text}>
    //         <Typography variant='h4'>Enter your available times</Typography>
    //       </Grid>
    //   <Grid item xs={12} className={classes.text}>
    //     <Typography variant='body1'>
    //       1. Click a day on the calendar to display all the available times
    //       during that day.
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={12} className={classes.text}>
    //     <Typography variant='body1'>
    //       2. Click on all your available times during that specific day.
    //     </Typography>
    //   </Grid>
    //     </Grid>
    // <Grid item container justify='center' alignItems='center'>
    //   <Grid item container md={12} lg={5} justify='center'>
    //     <Grid item>
    //       <Paper elevation={3}>
    //         <Calendar
    //           onChange={onChangeHandler}
    //           value={date}
    //           minDate={startDate}
    //           maxDate={endDate}
    //           tileDisabled={tileDisabled}
    //         />
    //       </Paper>
    //     </Grid>
    //   </Grid>
    //   <Grid item container md={12} lg={5} justify='center'>
    //     <Grid item className={classes.table}>
    //       <InterviewTimes times={dayTimes} handleClick={handleClick} />
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={12} className={classes.center}>
    //     <Button
    //       onClick={submitHandler}
    //       variant='contained'
    //       color='primary'
    //       fullWidth
    //       className={classes.submitButton}
    //       size='large'
    //     >
    //       Submit Times
    //     </Button>
    //   </Grid>
    //     </Grid>
    //   </Grid>
  )
}

export default Interviewee
