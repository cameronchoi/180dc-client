import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  footer: {
    marginTop: 'auto',
    backgroundColor: 'grey'
  },
  textContainer: {
    padding: 15,
    textAlign: 'center'
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container className={classes.textContainer}>
        <Typography variant='body1'>
          180 Degrees Consulting © 2020 Created by Cameron Choi, Matthew Phang,
          Chelsy Teng, Ulyana Yunitskaya, Liangyue Wang
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
