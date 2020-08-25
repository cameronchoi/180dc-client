import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, CardActionArea } from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 450,
    },
  },
  title: {
    fontSize: 14,
  },
  textContainer: {
    marginBottom: 10,
  },
  infoTitle: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 100,
    },
  },
  infoContainer: {
    padding: 15,
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
    borderBottom: 1,
    borderBottomColor: "#eaeaea",
    borderBottomStyle: "solid",
  },
  hoverClass: {
    padding: 15,
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
  },
}));

export default function UserCard({
  email,
  degrees,
  majors,
  digitalImpact,
  position,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Grid container className={classes.infoContainer}>
        <Grid item className={classes.infoTitle}>
          <Typography gutterBottom variant="subtitle1">
            Position
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="textSecondary">
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.infoContainer}>
        <Grid item className={classes.infoTitle}>
          <Typography gutterBottom variant="subtitle1">
            Email
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="subtitle1">
            {email}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.infoContainer}>
        <Grid item className={classes.infoTitle}>
          <Typography gutterBottom variant="subtitle1">
            Stream
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary" variant="subtitle1">
            {digitalImpact ? "Digital Impact" : "Strategy"}
          </Typography>
        </Grid>
      </Grid>
      <CardActionArea>
        <Link to="/changepassword" style={{ textDecoration: "none" }}>
          <Grid container className={classes.hoverClass}>
            <Grid item className={classes.infoTitle}>
              <Typography gutterBottom variant="subtitle1">
                Password
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="subtitle1">
                ••••••••••
              </Typography>
            </Grid>
          </Grid>
        </Link>
      </CardActionArea>
    </Card>
  );
}
