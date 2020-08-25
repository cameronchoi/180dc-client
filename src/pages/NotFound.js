import React from "react";
import { Typography, Grid } from "@material-ui/core";

const NotFound = () => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Typography variant="h3">404 Not Found</Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
