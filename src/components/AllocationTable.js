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
import { InterviewContext } from '../contexts/InterviewContext'

const useStyles = makeStyles(theme => ({
  table: {
    width: 300,
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

const AllocationTable = ({ allocations }) => {
  const classes = useStyles()

  const createTimeString = hour => {
    if (hour === 0) {
      return '12:00 AM'
    } else if (hour === 12) {
      return '12:00 PM'
    } else if (hour < 12) {
      return `${hour}:00 AM`
    }
    return `${hour - 12}:00 PM`
  }

  const convertToDateObj = string => {
    return new Date(string.substring(0, string.length - 1))
  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Room</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allocations.map(allocation => {
            console.log(allocation)
            return (
              <TableRow>
                <TableCell>
                  {convertToDateObj(allocation.interviewTime).toDateString()}
                </TableCell>
                <TableCell>
                  {createTimeString(
                    convertToDateObj(allocation.interviewTime).getHours()
                  )}
                </TableCell>
                <TableCell>{allocation.interviewRoom}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AllocationTable
