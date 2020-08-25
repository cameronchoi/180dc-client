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

import { differenceInCalendarDays } from "date-fns";
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
    marginTop: theme.spacing(2),
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
  const [fetchLoading, setFetchLoading] = useState(false);
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
    fetch(`http://127.0.0.1:8000/api/${position}times`, {
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
            alert(
              `${resData.errors}: Something went wrong... Please refresh your page and try again`
            );
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

  const positionGetTimes = (position) => {
    setFetchLoading(true);
    fetch(`http://127.0.0.1:8000/api/${position}times`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.length === 0) {
          setFetchLoading(false);
          return;
        }
        let times = [];
        resData.forEach((time, i) => {
          times.push({
            id: time.id,
            dateTime: time.datetime,
            date: new Date(
              time.datetime.substring(0, time.datetime.length - 1)
            ),
            selected: false,
            index: i,
          });
        });
        setAvailableTimes(times);
        setDate(times[0].date);
        setStartDate(times[0].date);
        setEndDate(times[times.length - 1].date);
        let currentDayTimes = times.filter((time) =>
          isSameDay(time.date, times[0].date)
        );
        setDayTimes(currentDayTimes);
        setFetchLoading(false);
      })
      .catch((err) => {
        alert("Unable to fetch data...");
        setFetchLoading(false);
      });
  };

  useEffect(() => {
    positionGetTimes(position);
  }, []);

  const handleClick = (index) => {
    let newTimes = [...availableTimes];
    newTimes[index].selected = !newTimes[index].selected;
    setAvailableTimes(newTimes);
  };

  let mainContent;

  if (fetchLoading) {
    mainContent = (
      <Grid item>
        <CircularProgress />
      </Grid>
    );
  } else {
    if (availableTimes.length === 0) {
      mainContent = (
        <Grid item>
          <Typography className={classes.text}>
            There are no times left. If you have not been allocated an interview
            yet please contact sydney@180dc.org
          </Typography>
        </Grid>
      );
    } else {
      mainContent = (
        <>
          <Grid item xs={12} className={classes.text}>
            <Typography variant="body1">
              1. Click a day on the calendar to display all the available times
              during that day.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.text}>
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
        </>
      );
    }
  }

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
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4">Enter your available times</Typography>
        </Grid>
        {mainContent}
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
