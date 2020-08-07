import React from 'react'
import { AppBar, Toolbar, Paper, Button, Box } from '@material-ui/core'

import logo from '../assets/logo.svg'

import { makeStyles } from '@material-ui/core/styles'
import Auth from '../Auth'

const useStyles = makeStyles(() => ({
  logoStyles: {
    flex: 1,
    margin: 15
  },
  buttonStyles: {
    marginRight: 10
  }
}))

const Header = ({ history }) => {
  const classes = useStyles()

  const onClickHandler = () => {
    Auth.logout(() => {
      history.push('/login')
    })
  }
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Box className={classes.logoStyles}>
          <img src={logo} alt='logo' style={{ height: 50 }} />
        </Box>
        {/* <Button
            className={classes.buttonStyles}
            variant='contained'
            color='primary'
            disableRipple={true}
            disableElevation={true}
          >
            Logout
          </Button> */}
        <Button
          onClick={onClickHandler}
          variant='contained'
          color='secondary'
          disableRipple={true}
          disableElevation={true}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
