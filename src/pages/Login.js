import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Auth from '../Auth'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    minHeight: '100vh'
  }
}))

export default function SignIn (props) {
  const classes = useStyles()

  const onClickHandler = () => {
    Auth.login(() => {
      props.history.push('/interviewee')
    })
  }

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}
    >
      <Grid item>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={onClickHandler}
          >
            Login
          </Button>
        </form>
        <Grid item>
          <Typography variant='body2' color='textSecondary' align='center'>
            University of Sydney, 180 Degrees Consulting © 2020
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
