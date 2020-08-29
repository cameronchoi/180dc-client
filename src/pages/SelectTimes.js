import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Modal,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import useInterval from "../hooks/useInterval";

import { differenceInCalendarDays, isBefore, isAfter, isEqual } from "date-fns";
import Header from "../components/Header";
import Calendar from "react-calendar";
import InterviewTimes from "../components/InterviewTimes";
import Footer from "../components/Footer";
import "./calendar.css";

import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    maxWidth: 300,
  },
  text: {
    textAlign: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 20,
    fontSize: 22,

    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
  },
  issueText: {
    textAlign: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  root: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  table: {
    marginBottom: 10,
  },
  paper: {
    width: 400,
    textAlign: "center",
    padding: theme.spacing(3),
    margin: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SelectTimes = (props) => {
  const classes = useStyles();
  //   const [state, dispatch] = useContext(AuthContext)

  const userToken = Cookies.get("userToken");
  const position = Cookies.get("position");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [dayTimes, setDayTimes] = useState([]);
  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onChangeHandler = (nextDate) => {
    setDate(nextDate);
    let currentDayTimes = availableTimes.filter((time) =>
      isSameDay(time.date, nextDate)
    );
    setDayTimes(currentDayTimes);
  };

  const positionPostTimes = (position, sendTimes) => {
    setLoading(true);
    fetch(`https://admin.180dcusyd.org/api/${position}times`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
      body: JSON.stringify({
        availableTimes: sendTimes,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.errors) {
          console.log(resData.errors);
          if (resData.errors === "interviewer applications closed") {
            alert("Interviewer time selection period has finished.");
            setLoading(false);
            props.history.push("/");
          } else {
            alert(`${resData.errors}: Please refresh your page and try again`);
          }
          setLoading(false);
        } else {
          console.log(resData);
          setLoading(false);
          setOpenModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong...");
        setLoading(false);
      });
  };

  const submitHandler = () => {
    let sendTimes = [];
    availableTimes.forEach((time) => {
      if (time.selected) {
        sendTimes.push(time.dateTime);
      }
    });
    if (sendTimes.length < 1) {
      return alert("Please select at least one time");
    } else {
      positionPostTimes(position, sendTimes);
    }
  };

  const modalButtonHandler = () => {
    props.history.push("/allocation");
  };

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  function tileDisabled({ date, view }) {
    if (view === "month") {
      let flag = true;
      availableTimes.forEach((dDate) => {
        if (isSameDay(dDate.date, date)) {
          flag = false;
        }
      });
      return flag;
    }
  }

  const customIncludes = (times, datetime) => {
    if (times.length === 0) {
      console.log("Returns false");
      return false;
    }
    times.forEach((time) => {
      if (time.dateTime === datetime) {
        console.log("Returns true");
        return true;
      }
    });
    console.log("Returns false");
    return false;
  };

  const positionGetTimes = (position) => {
    fetch(`https://admin.180dcusyd.org/api/${position}times`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.length === 0) {
          alert(
            "No times left. If you have not been allocated an interview yet please contact sydney@180dc.org"
          );
          props.history.push("/");
          return;
        }
        let times = [];
        let count = 0;
        resData.forEach((time) => {
          let flag = true;
          times.forEach((t) => {
            if (t.dateTime === time.datetime) {
              flag = false;
            }
          });
          if (flag) {
            times.push({
              id: time.id,
              dateTime: time.datetime,
              date: new Date(
                time.datetime.substring(0, time.datetime.length - 1)
              ),
              selected: false,
              index: count,
            });
            count++;
          }
        });
        refreshTimes(times);
      })
      .catch((err) => {
        alert("Unable to fetch data...");
        props.history.push("/");
      });
  };

  const refreshTimes = (times) => {
    console.log("refreshed");
    availableTimes.forEach((prevTime) => {
      for (let i = 0; i < times.length; i++) {
        if (times[i].id === prevTime.id) {
          times[i].selected = prevTime.selected;
          break;
        }
      }
    });
    setAvailableTimes(times);

    if (date === undefined) {
      setDate(times[0].date);
      setStartDate(times[0].date);
      setEndDate(times[times.length - 1].date);
      let currentDayTimes = times.filter((time) =>
        isSameDay(time.date, times[0].date)
      );
      setDayTimes(currentDayTimes);
    } else {
      let currentDayTimes = times.filter((time) => isSameDay(time.date, date));
      if (!isEqual(times[0].date, startDate)) {
        setStartDate(times[0].date);
        if (isBefore(date, times[0].date)) {
          setDate(times[0].date);
          currentDayTimes = times.filter((time) =>
            isSameDay(time.date, times[0].date)
          );
        }
      }

      if (!isEqual(times[times.length - 1].date, endDate)) {
        setEndDate(times[times.length - 1].date);
        if (isAfter(date, times[times.length - 1].date)) {
          setDate(times[times.length - 1].date);
          currentDayTimes = times.filter((time) =>
            isSameDay(time.date, times[times.length - 1].date)
          );
        }
      }
      setDayTimes(currentDayTimes);
    }
  };

  useEffect(() => {
    positionGetTimes(position);
    const timeoutID = setTimeout(() => {
      alert(
        "You have exceeded 10 minutes for selecting times. Please try again."
      );
      props.history.push("/");
    }, 600000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  useInterval(() => {
    positionGetTimes(position);
  }, 5000);

  const handleClick = (index) => {
    let newTimes = [...availableTimes];
    newTimes[index].selected = !newTimes[index].selected;
    setAvailableTimes(newTimes);
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="space-between"
    >
      <Modal open={openModal} className={classes.modal}>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h6" id="simple-modal-title">
                Congratulations!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" id="simple-modal-description">
                You have successfully submitted your times.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={modalButtonHandler}
              >
                View Interview Allocation
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>

      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item container alignItems="center" direction="column" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Enter your available times
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.text}>
          <Typography variant="body1">
            1. Click a day on the calendar to display all the available times
            during that day.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.issueText}>
          <Typography variant="body1">
            2. Click on all your available times during that calendar day.
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="center">
          <Grid item container md={12} lg={5} justify="center">
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
          <Grid item container md={12} lg={5} justify="center">
            <Grid item className={classes.table}>
              <InterviewTimes times={dayTimes} handleClick={handleClick} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              onClick={submitHandler}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
              size="large"
              disabled={!availableTimes.length}
            >
              Submit times
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} justify="center">
        <Typography variant="body2" className={classes.issueText}>
          If you encounter any major issues please contact sydney@180dc.org
        </Typography>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default SelectTimes;
