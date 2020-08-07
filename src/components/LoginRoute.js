import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import Cookies from 'js-cookie'

const LoginRoute = ({ component: Component, ...rest }) => {
  const userToken = Cookies.get('userToken')
  return (
    <Route
      {...rest}
      render={props =>
        !userToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default LoginRoute
