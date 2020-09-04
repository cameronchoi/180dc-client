import axios from "axios";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  center: {
    // textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  margin: {
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
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

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    setLoading(true);
    if (selectedFile === null) {
      alert("Please upload the csv file.");
      setLoading(false);
      return;
    }
    if (selectedFile.type !== "text/csv") {
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
    formData.append("file", selectedFile);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    // console.log(formData);
    axios({
      method: "post",
      url: "https://email.180dcusyd.org/upload",
      data: formData,
      headers: { email, password },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setSuccess(true);
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
      return (
        <div className={classes.margin}>
          <Typography>File Details:</Typography>
          <Typography>File Name: {selectedFile.name}</Typography>
          <Typography>File Type: {selectedFile.type}</Typography>
          <Typography>
            Last Modified: {selectedFile.lastModifiedDate.toDateString()}
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
        1. Go to this{" "}
        <a
          href="https://myaccount.google.com/u/1/lesssecureapps"
          target="_blank"
        >
          link
        </a>{" "}
        and turn less secure app access ON for the time being. Once all the
        emails have been sent out, remember to turn this back off. Make sure you
        are on the gmail account you will be sending from.
      </Typography>
      <Typography className={classes.margin}>
        2. Upload the csv file with the emails and auto-generated passwords.
      </Typography>
      <input type="file" onChange={onFileChange} className={classes.margin} />
      {fileData()}
      <Typography className={classes.margin}>
        3. Input the email you would like to send the emails from and the
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
      <Typography className={classes.margin}>4. Press send emails!</Typography>
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
      {success ? (
        <Typography variant="h5">Emails successfully sent!</Typography>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Email;
