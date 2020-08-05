import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import Auth from '../Auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
