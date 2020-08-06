import React, { useState } from 'react'
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

const useStyles = makeStyles(theme => ({
  table: {
    width: 350,
    [theme.breakpoints.up('sm')]: {
      width: 580
    }
  },
  tableContainer: {
    maxHeight: 300,
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxHeight: 450
    }
  }
}))

const InterviewTimes = ({
  times,
  handleSelectAllClick,
  rowCount,
  numSelected
}) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                onChange={handleSelectAllClick}
                checked={rowCount > 0 && numSelected === rowCount}
              />
            </TableCell>
            <TableCell align='center'>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.map(time => {
            console.log(time.time)
            return (
              <TableRow key={time.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell align='center'>{time.time}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InterviewTimes
