import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import { proj_confs } from '../config.js';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  welcome: {
    fontSize: 22,
    marginBottom: 30,
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
  },
  userInfo: {
    marginBottom: 30,
  },
  submitButton: {
    marginBottom: 10,
    maxWidth: 280,
  },
  link: {
    textDecoration: "none",
  },
  smallText: {
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  root: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  auto: {
    marginTop: "auto",
  },
  userContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const UserDetails = (props) => {
  const classes = useStyles();
  const userToken = Cookies.get("userToken");
  const position = Cookies.get("position");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [degrees, setDegrees] = useState([]);
  const [majors, setMajors] = useState([]);
  const [digitalImpact, setDigitalImpact] = useState("");
  const [timeAllocated, setTimeAllocated] = useState(false);
  const [loading, setLoading] = useState(false);

  let button;

  if (loading) {
    button = <CircularProgress />;
  } else {
    if (timeAllocated) {
      button = (
        <Link to="/allocation" className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
            size="large"
          >
            View interview allocation
          </Button>
        </Link>
      );
    } else {
      button = (
        <Link to="/times" className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
            size="large"
          >
            Select interview times
          </Button>
        </Link>
      );
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(new URL(`api/${position}`, proj_confs.root).href, {
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
          setFirstName(resData.user.first_name);
          setLastName(resData.user.last_name);
          setEmail(resData.user.email);
          setDegrees([resData.degree_one]);
          setMajors([resData.major_one]);
          if (resData.degree_two.length > 0) {
            setDegrees((degrees) => [...degrees, resData.degree_two]);
          }
          if (resData.major_two.length > 0) {
            setMajors((majors) => [...majors, resData.major_two]);
          }
          setDigitalImpact(resData.digital_impact);
        }
        fetch(new URL("api/interviewtimes", proj_confs.root).href, {
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
              if (resData.length > 0) {
                setTimeAllocated(true);
              }
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong...");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong...");
        setLoading(false);
      });
  }, [position, userToken]);

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="space-between"
    >
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Grid item container alignItems="center" className={classes.userContent}>
        <Grid item xs={12} className={classes.center}>
          <Typography variant="h4" className={classes.welcome}>
            {`Welcome, ${firstName} ${lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Grid item className={classes.userInfo}>
            <UserCard
              email={email}
              degrees={degrees}
              majors={majors}
              digitalImpact={digitalImpact}
              position={position}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          {button}
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default UserDetails;
