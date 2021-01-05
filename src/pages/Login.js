import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../contexts/AuthContext";

import Cookies from "js-cookie";
import { CircularProgress } from "@material-ui/core";
import { proj_confs } from '../config.js';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    minHeight: "100vh",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [state, dispatch] = useContext(AuthContext);

  const onClickHandler = () => {
    setLoading(true);
    setErrorMessage("");
    if (username.length === 0 || password.length === 0) {
      setLoading(false);
      return alert("Please input your username and password");
    }
    fetch(new URL("api/login", proj_confs.root).href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username.toLowerCase(), password }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.non_field_errors) {
          console.log(resData);
          setErrorMessage("Your username or password is wrong");
          setLoading(false);
        } else {
          dispatch({
            type: "SIGN-IN",
            token: resData.token,
            position: resData.position,
          });

          Cookies.set("userToken", resData.token);
          Cookies.set("position", resData.position);
          Cookies.set("admin", resData.is_staff);
          setLoading(false);
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Something went wrong...");
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <form className={classes.form} noValidate>
          <TextField
            error={errorMessage ? true : false}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            error={errorMessage ? true : false}
            helperText={errorMessage}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickHandler}
            >
              Login
            </Button>
          )}
        </form>
        <Grid item>
          <Typography variant="body2" color="textSecondary" align="center">
            University of Sydney, 180 Degrees Consulting © 2020
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
