import axios from "axios";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";
import { proj_confs } from "../config";

import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  center: {
    // textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    height: "100vh",
    paddingTop: 20,
  },
  margin: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
}));

const Email = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [wrongCred, setWrongCred] = useState(false);
  
  const userToken = Cookies.get("userToken");

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    setLoading(true);
    setSuccess(false);
    setWrongCred(false);
    if (selectedFile === null) {
      alert("Please upload the csv file.");
      setLoading(false);
      return;
    }
    // some weird windows bug where csv are identified as excel
    if (selectedFile.type !== "text/csv" && selectedFile.type !== "application/vnd.ms-excel") {
      alert("Please upload a csv type file");
      setLoading(false);
      return;
    }
    if (email.length === 0 || password.length === 0) {
      alert("Please input the email and password.");
      setLoading(false);
      return;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("time_csv", selectedFile);
    formData.append("email", email);
    formData.append("password", password);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object

    fetch(new URL("api/sendemail", proj_confs.root).href, {
      method: "POST",
      headers: {
        Authorization: `Token ${userToken}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 403) {
          setWrongCred(true);
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.response);
        setLoading(false);
      });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      var last_mod = new Date(selectedFile.lastModified);
      return (
        <div className={classes.margin}>
          <Typography>File Details:</Typography>
          <Typography>File Name: {selectedFile.name}</Typography>
          <Typography>File Type: {selectedFile.type}</Typography>
          <Typography>
            Last Modified: {last_mod.toDateString()}
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.margin}>
          <Typography>
            Choose a file before Pressing the Upload button
          </Typography>
        </div>
      );
    }
  };

  return (
    <div className={classes.center}>
      <Typography variant="h4" className={classes.title}>
        180DC Email Automation
      </Typography>
      <Typography className={classes.margin}>
        1. Upload the csv file with the emails and auto-generated passwords.
      </Typography>
      <input type="file" onChange={onFileChange} className={classes.margin} />
      {fileData()}
      <Typography className={classes.margin}>
        2. Input the email you would like to send the emails from and the
        password to that email.
      </Typography>
      <Typography>Email</Typography>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.margin}
      />
      <Typography>Password</Typography>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.margin}
      />
      <Typography className={classes.margin}>3. Press send emails!</Typography>
      {success ? (
        <Typography variant="h5">Emails successfully sent!</Typography>
      ) : (
        <></>
      )}
      {wrongCred ? (
        <Typography variant="h5">Incorrent password/email!</Typography>
      ) : (
        <></>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <button
          disabled={success}
          onClick={onFileUpload}
          className={classes.margin}
        >
          Send emails
        </button>
      )}
      
    </div>
  );
};

export default Email;
