import React from 'react'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500
  }
}))

const InterviewTimes = () => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>9am</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InterviewTimes
