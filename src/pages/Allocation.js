import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AllocationTable from "../components/AllocationTable";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  issueText: {
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  table: {
    marginBottom: theme.spacing(4),
    margin: "auto",
  },
  submitButton: {
    width: 240,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  smallText: {
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  overflowHide: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  auto: {
    marginTop: "auto",
  },
}));

const Allocation = (props) => {
  const classes = useStyles();
  const [interviewAllocations, setInterviewAllocations] = useState([]);

  const userToken = Cookies.get("userToken");

  const submitHandler = () => {
    props.history.push("/times");
  };

  let table;

  if (interviewAllocations.length > 0) {
    table = <AllocationTable allocations={interviewAllocations} />;
  } else {
    table = (
      <Typography className={classes.smallText}>
        You have not been allocated an interview yet. If you think this is wrong
        please contact sydney@180dc.org
      </Typography>
    );
  }

  useEffect(() => {
    fetch("https://admin.180dcusyd.org/api/interviewtimes", {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.errors) {
          alert(
            "Something went wrong... Please refresh your page and try again"
          );
        } else {
          console.log(resData);
          setInterviewAllocations(resData);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong...");
      });
  }, []);

  return (
    <Grid
      container
      className={classes.overflowHide}
      direction="column"
      justify="space-between"
    >
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item container alignItems="center">
        <Grid item xs={12} className={classes.center}>
          <Typography variant="h4" className={classes.table}>
            Interview Allocation
          </Typography>
        </Grid>
        <Grid item xs={10} lg={8} className={classes.table}>
          {table}
        </Grid>
        <Grid item xs={12} className={classes.table}>
          <Typography variant="body2" className={classes.issueText}>
            If you encounter any major issues please contact sydney@180dc.org
          </Typography>
        </Grid>
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                onClick={submitHandler}
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitButton}
                size="large"
              >
                Go back home
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              onClick={submitHandler}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
              size="large"
            >
              {interviewAllocations.length
                ? "Redo time selection"
                : "Select interview times"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Allocation;
