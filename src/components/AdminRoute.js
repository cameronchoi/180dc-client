import React from "react";

import { Route, Redirect } from "react-router-dom";

import Cookies from "js-cookie";

const Admin = ({ component: Component, ...rest }) => {
  const admin = Cookies.get("admin");
  return (
    <Route
      {...rest}
      render={(props) =>
        admin === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Admin;
