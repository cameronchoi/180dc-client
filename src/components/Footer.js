import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "auto",
    backgroundColor: "#f0f2f5",
  },
  textContainer: {
    padding: 15,
    textAlign: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container className={classes.textContainer} color="secondary">
        <Typography variant="body2">
          180 Degrees Consulting USYD 2020. Created by Cameron Choi, Matthew
          Phang, Chelsy Teng, Ulyana Yunitskaya, Liangyue Wang
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
