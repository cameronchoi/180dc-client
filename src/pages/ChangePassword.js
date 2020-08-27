import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Modal,
  Paper,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
  submitButton: {
    width: 240,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  overflowHide: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  auto: {
    marginTop: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    maxWidth: 600,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  caseText: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  storeText: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
  },
  title: {
    marginTop: 25,
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
  backIcon: {
    position: "absolute",
    left: 25,
    top: 100,
    fontSize: 40,
  },
}));

const ChangePassword = (props) => {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const userToken = Cookies.get("userToken");

  const submitHandler = () => {
    setLoading(true);
    setErrorMessage("");
    setOldPasswordIncorrect(false);
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage("Password is not eight characters. ");
      setLoading(false);
      return;
    }
    fetch("admin.180dcusyd.org/api/changepassword", {
      method: "POST",
      headers: {
        Authorization: `Token ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.errors) {
          if (resData.errors === "old password incorrect") {
            setOldPasswordIncorrect(true);
            setLoading(false);
            return;
          }
          setLoading(false);
          return;
        }
        console.log(resData);
        setLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Something else went wrong.");
      });
  };

  const modalButtonHandler = () => {
    props.history.push("/");
  };

  return (
    <Grid
      container
      className={classes.overflowHide}
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
                You have successfully changed your password.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={modalButtonHandler}
              >
                Go back home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Grid item>
        <Header history={props.history} />
      </Grid>
      <Link to="/" className={classes.backIcon}>
        <ArrowBackIcon fontSize="large" />
      </Link>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item className={classes.title}>
          <Typography component="h1" variant="h5">
            Password
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <form className={classes.form} noValidate>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.caseText}
            >
              Passwords are case sensitive. Please store your password in a safe
              place.
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.storeText}
            >
              In the case that you forget your password you will have to contact
              sydney@180.org for a password reset.
            </Typography>
            <TextField
              error={oldPasswordIncorrect ? true : false}
              helperText={oldPasswordIncorrect ? "Wrong old password" : ""}
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="old-password"
              label="Old Password"
              name="old-password"
              type={showOldPassword ? "text" : "password"}
              autoComplete="old-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
            <Typography
              variant="body3"
              color="textSecondary"
              className={classes.adviceText}
            >
              Use at least 8 characters and a mixture of letters and numbers.
            </Typography>
            <TextField
              error={errorMessage ? true : false}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new-password"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={errorMessage ? true : false}
              helperText={errorMessage}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              autoComplete="confirm-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                onClick={submitHandler}
              >
                Change Password
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
