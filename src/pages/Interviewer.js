import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button, Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { differenceInCalendarDays } from 'date-fns'
import Header from '../components/Header'
import Calendar from 'react-calendar'
import InterviewTimes from '../components/InterviewTimes'
import Footer from '../components/Footer'
import './calendar.css'

const useStyles = makeStyles(theme => ({
  center: {
    textAlign: 'center'
  },
  table: {
    marginBottom: 
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
  }
}))

const Interviewer = props => {
  const classes = useStyles()
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
    fetch('https://admin.180dcusyd.org/api/interviewertimes')
      .then(res => res.json())
      .then(resData => {
        let times = []
        resData.forEach((time, i) => {
          times.push({
            id: time.id,
            dateTime: time.datetime,
            date: new Date(
              time
            ).toLocaleString("en-US", {timeZone: "UTC"}),
            selected: false,
            index: i
          })
        })
        if (times.length > 0) {
          setAvailableTimes(times)
          setDate(times[0].date)
          setStartDate(times[0].date)
          setEndDate(times[times.length - 1].date)
          let currentDayTimes = times.filter(time =>
            isSameDay(time.date, times[0].date)
          )
          setDayTimes(currentDayTimes)
        } else {
          alert('No times are available. Please email 180DC@email.com')
        }
      })
  }, [])

  const handleClick = index => {
    let newTimes = [...availableTimes]
    newTimes[index].selected = !newTimes[index].selected
    setAvailableTimes(newTimes)
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
            <Typography variant='body1'>
              1. Click a day on the calendar to display all the available times
              during that day.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.smallText}>
            <Typography variant='body1'>
              2. Click on all your available times during that specific day.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify='center' alignItems='center'>
          <Grid item container md={12} lg={5} justify='center'>
            <Grid item>
              <Paper>
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
          <Grid item container md={12} lg={5} justify='center'>
            <Grid item className={classes.table}>
              <InterviewTimes times={dayTimes} handleClick={handleClick} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <Button
              onClick={() => {
                let sendTimes = []
                availableTimes.forEach(time => {
                  if (time.selected) {
                    sendTimes.push(time.dateTime)
                  }
                })
                if (sendTimes.length < 2 && availableTimes.length > 1) {
                  return alert('Please select at least two times')
                } else {
                  fetch('https://admin.180dcusyd.org/api/interviewertimes', {
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
                      console.log(resData)
                    })
                }
              }}
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
      <Footer />
    </div>
  )
}

export default Interviewer
