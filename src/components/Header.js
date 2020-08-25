import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";

import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  logoStyles: {
    flex: 1,
    margin: 15,
  },
  logoutButton: {},
}));

const Header = ({ history }) => {
  const [state, dispatch] = useContext(AuthContext);
  const classes = useStyles();

  const onClickHandler = () => {
    dispatch({ type: "SIGN_OUT" });
    history.push("/login");
  };
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Box className={classes.logoStyles}>
          <Link to="/">
            <img src={logo} alt="logo" style={{ height: 50 }} />
          </Link>
        </Box>

        <Button
          className={classes.logoutButton}
          onClick={onClickHandler}
          variant="contained"
          color="primary"
          disableRipple={true}
          disableElevation={true}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
