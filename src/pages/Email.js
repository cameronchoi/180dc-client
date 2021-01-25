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
  const [fileDict, setFileDict] = useState(null);
  const [signature, setSignature] = useState(null);
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const userToken = Cookies.get("userToken");

  // On file upload (click the upload button)
  const onFileUpload = () => {
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");
    if (fileDict === null) {
      alert("Please upload the csv file.");
      setLoading(false);
      return;
    }else if (content === null) {
      alert("Please enter content.");
      setLoading(false);
      return;
    }else if (fileDict.type !== "text/csv" && fileDict.type !== "application/vnd.ms-excel") {
      // some weird windows bug where csv are identified as excel
      alert("Please upload a csv type file");
      setLoading(false);
      return;
    }else if (email.length === 0 || password.length === 0) {
      alert("Please input the email and password.");
      setLoading(false);
      return;
    }else if (subject.length === 0) {
      alert("Please input subject.");
      setLoading(false);
      return;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file_dict", fileDict);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("subject", subject);
    formData.append("content", content);
    if (signature) {
      formData.append("signature", signature);
    }

    // Request made to the backend api
    // Send formData object

    fetch(new URL("api/sendemail", proj_confs.root).href, {
      method: "POST",
      headers: {
        Authorization: `Token ${userToken}`,
      },
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      setLoading(false);
      if (res.status === "success") {
        setSuccess(true);
      }else{
        setErrorMessage(res.message);
      }
    })
    .catch((err) => {
      alert(err);
      setLoading(false);
    });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (fileDict) {
      var last_mod = new Date(fileDict.lastModified);
      return (
        <div className={classes.margin}>
          <Typography>File Details:</Typography>
          <Typography>File Name: {fileDict.name}</Typography>
          <Typography>File Type: {fileDict.type}</Typography>
          <Typography>
            Last Modified: {last_mod.toDateString()}
          </Typography>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className={classes.center}>
      <Typography variant="h4" className={classes.title}>
        180DC Email Automation
      </Typography>
      <Typography className={classes.margin}>
        1. Upload the csv file with the target address and content dictionary. Must contain a column with 'address'.
      </Typography>
      <input type="file" onChange={(e) => setFileDict(e.target.files[0])} className={classes.margin} />
      {fileData()}
      <Typography className={classes.margin}>
        2. Input the email you would like to send the emails from and the
        password to that email.
      </Typography>
      <Typography>Email</Typography>
      <input
        type="email"
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
      <Typography className={classes.margin}>
        3. Subject line with python formatting rules
      </Typography>
      <textarea
        cols="100"
        rows="10"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className={classes.margin}
      />
      <Typography className={classes.margin}>
        4. Content with python formatting rules
      </Typography>
      <textarea
        cols="100"
        rows="10"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={classes.margin}
      />
      <Typography className={classes.margin}>
        6. Upload html signature (optional).
      </Typography>
      <input type="file" onChange={(e) => setSignature(e.target.files[0])} className={classes.margin} />
      <Typography className={classes.margin}>6. Press send emails!</Typography>
      {success ? (
        <Typography variant="h5">Emails successfully sent!</Typography>
      ) : (
        <></>
      )}
      {errorMessage !== "" ? (
        <Typography variant="h5">Error: {errorMessage}</Typography>
      ) : (
        <></>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <button
          // disabled={success}
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
