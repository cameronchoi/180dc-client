import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: 20,
  },
  bottomText: {
    textAlign: "center",
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  root: {
    height: "100vh",
  },
  select: {
    width: 250,
  },
  form: {
    height: 500,
  },
}));

const CreateTimes = () => {
  const classes = useStyles();
  const [from, setFrom] = useState(6);
  const [to, setTo] = useState(23);
  const [diNum, setDiNum] = useState(1);
  const [strNum, setStrNum] = useState(1);
  const [interviewerNum, setInterviewerNum] = useState(2);
  const [intervieweeNum, setIntervieweeNum] = useState(4);

  const userToken = Cookies.get("userToken");

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(null);

  const onChangeHandler = (nextDate) => {
    setDate(nextDate);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const submitHandler = () => {
    if (!date) {
      alert("Please make sure you have clicked a day on the calendar");
      return;
    }
    if (!from) {
      alert("Please make sure you have selected a from time");
      return;
    }
    if (!to) {
      alert("Please make sure you have selected a to time");
      return;
    }
    setLoading(true);
    let sendTimes = [];
    for (let i = from; i <= to; i++) {
      sendTimes.push(createISOString(createDateString(date), i));
    }

    fetch("https://admin.180dcusyd.org/api/createtimes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
      body: JSON.stringify({
        times: sendTimes,
        digital_impact_num: diNum,
        strategy_num: strNum,
        interviewer_num: interviewerNum,
        interviewee_num: intervieweeNum,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        alert("Success!");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong...");
        setLoading(false);
      });
  };

  const createDateString = (date) => {
    let result = date.getFullYear() + "-";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if (month < 10) {
      result = result + "0" + month + "-";
    } else {
      result = result + month + "-";
    }
    if (day < 10) {
      result = result + "0" + day;
    } else {
      result = result + day;
    }

    return result;
  };

  const createISOString = (dateString, time) => {
    if (time < 10) {
      return `${dateString}T0${time}:00:00.000Z`;
    }
    return `${dateString}T${time}:00:00.000Z`;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Bulk Create Interview Times
      </Typography>
      <Typography variant="body1" className={classes.title}>
        1. Select a day on the calendar that you would like to create interviews
        on.
      </Typography>
      <Typography variant="body1" className={classes.title}>
        2. Select a range of times and click "Create interview times on this
        day".
      </Typography>
      <Typography variant="body1" className={classes.bottomText}>
        3. Repeat for each day you would like interviews on.
      </Typography>
      <Grid container justify="center">
        <Grid
          item
          container
          xs={12}
          lg={5}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Calendar onChange={onChangeHandler} value={date} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          lg={5}
          direction="column"
          alignItems="center"
          justify="space-around"
          className={classes.form}
        >
          <Grid item container justify="space-around">
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">From:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={from}
                  onChange={handleFromChange}
                >
                  <MenuItem value={0}>12am</MenuItem>
                  <MenuItem value={1}>1am</MenuItem>
                  <MenuItem value={2}>2am</MenuItem>
                  <MenuItem value={3}>3am</MenuItem>
                  <MenuItem value={4}>4am</MenuItem>
                  <MenuItem value={5}>5am</MenuItem>
                  <MenuItem value={6}>6am</MenuItem>
                  <MenuItem value={7}>7am</MenuItem>
                  <MenuItem value={8}>8am</MenuItem>
                  <MenuItem value={9}>9am</MenuItem>
                  <MenuItem value={10}>10am</MenuItem>
                  <MenuItem value={11}>11am</MenuItem>
                  <MenuItem value={12}>12pm</MenuItem>
                  <MenuItem value={13}>1pm</MenuItem>
                  <MenuItem value={14}>2pm</MenuItem>
                  <MenuItem value={15}>3pm</MenuItem>
                  <MenuItem value={16}>4pm</MenuItem>
                  <MenuItem value={17}>5pm</MenuItem>
                  <MenuItem value={18}>6pm</MenuItem>
                  <MenuItem value={19}>7pm</MenuItem>
                  <MenuItem value={20}>8pm</MenuItem>
                  <MenuItem value={21}>9pm</MenuItem>
                  <MenuItem value={22}>10pm</MenuItem>
                  <MenuItem value={23}>11pm</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">To:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={to}
                  onChange={handleToChange}
                >
                  <MenuItem value={0}>12am</MenuItem>
                  <MenuItem value={1}>1am</MenuItem>
                  <MenuItem value={2}>2am</MenuItem>
                  <MenuItem value={3}>3am</MenuItem>
                  <MenuItem value={4}>4am</MenuItem>
                  <MenuItem value={5}>5am</MenuItem>
                  <MenuItem value={6}>6am</MenuItem>
                  <MenuItem value={7}>7am</MenuItem>
                  <MenuItem value={8}>8am</MenuItem>
                  <MenuItem value={9}>9am</MenuItem>
                  <MenuItem value={10}>10am</MenuItem>
                  <MenuItem value={11}>11am</MenuItem>
                  <MenuItem value={12}>12pm</MenuItem>
                  <MenuItem value={13}>1pm</MenuItem>
                  <MenuItem value={14}>2pm</MenuItem>
                  <MenuItem value={15}>3pm</MenuItem>
                  <MenuItem value={16}>4pm</MenuItem>
                  <MenuItem value={17}>5pm</MenuItem>
                  <MenuItem value={18}>6pm</MenuItem>
                  <MenuItem value={19}>7pm</MenuItem>
                  <MenuItem value={20}>8pm</MenuItem>
                  <MenuItem value={21}>9pm</MenuItem>
                  <MenuItem value={22}>10pm</MenuItem>
                  <MenuItem value={23}>11pm</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container justify="space-around">
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">
                  Num of DI interviews
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={diNum}
                  onChange={(e) => setDiNum(e.target.value)}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">
                  Num of Strategy interviews
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={strNum}
                  onChange={(e) => setStrNum(e.target.value)}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container justify="space-around">
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">
                  Max interviewers
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={interviewerNum}
                  onChange={(e) => setInterviewerNum(e.target.value)}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">
                  Max interviewees
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={intervieweeNum}
                  onChange={(e) => setIntervieweeNum(e.target.value)}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              disabled={loading}
            >
              Create interview times on this day.
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTimes;
