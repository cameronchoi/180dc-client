import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 450
    },
    textAlign: 'center'
  },
  title: {
    fontSize: 14
  },
  textContainer: {
    marginBottom: 10
  }
}))

export default function UserCard ({
  email,
  degrees,
  majors,
  digitalImpact,
  position
}) {
  const classes = useStyles()

  let degreeText = degrees[0]
  let majorText = majors[0]

  if (degrees.length > 1) {
    degreeText = `${degreeText}, ${degrees[1]}`
  }

  if (majors.length > 1) {
    majorText = `${majorText}, ${majors[1]}`
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Container className={classes.textContainer}>
          <Typography gutterBottom variant='h6'>
            Position
          </Typography>
          <Typography color='textSecondary' variant='h6' component='h2'>
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </Typography>
        </Container>
        <Container className={classes.textContainer}>
          <Typography gutterBottom variant='h6'>
            Email
          </Typography>
          <Typography color='textSecondary' variant='h6' component='h2'>
            {email}
          </Typography>
        </Container>
        <Container className={classes.textContainer}>
          <Typography gutterBottom variant='h6'>
            Degree(s)
          </Typography>
          <Typography color='textSecondary' variant='h6' component='h2'>
            {degreeText}
          </Typography>
        </Container>
        <Container className={classes.textContainer}>
          <Typography gutterBottom variant='h6'>
            Major(s)
          </Typography>
          <Typography color='textSecondary' variant='h6' component='h2'>
            {majorText}
          </Typography>
        </Container>
        <Container className={classes.textContainer}>
          <Typography gutterBottom variant='h6'>
            Digital Impact
          </Typography>
          <Typography color='textSecondary' variant='h6' component='h2'>
            {digitalImpact ? 'True' : 'False'}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  )
}
