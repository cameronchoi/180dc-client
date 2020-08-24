import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 580,
    },
  },
  tableContainer: {
    maxHeight: 300,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      maxHeight: 450,
    },
  },
}));

const AllocationTable = ({ allocations }) => {
  const classes = useStyles();

  const createTimeString = (hour) => {
    if (hour === 0) {
      return "12:00 AM";
    } else if (hour === 12) {
      return "12:00 PM";
    } else if (hour < 12) {
      return `${hour}:00 AM`;
    }
    return `${hour - 12}:00 PM`;
  };

  const convertToDateObj = (string) => {
    return new Date(string.substring(0, string.length - 1));
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Zoom Link</TableCell>
            {/* <TableCell>Interviewees</TableCell>
            <TableCell>Interviewers</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allocations.map((allocation) => {
            let roomText = allocation.room;

            if (allocation.room === null) {
              roomText = "No Room Yet";
            }
            return (
              <TableRow key={allocation.datetime}>
                <TableCell>
                  {convertToDateObj(allocation.datetime).toDateString()}
                </TableCell>
                <TableCell>
                  {createTimeString(
                    convertToDateObj(allocation.datetime).getHours()
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href="https://uni-sydney.zoom.us/j/7240988390"
                    target="_blank"
                  >
                    Click to go to link
                  </Link>
                </TableCell>
                {/* <TableCell>{roomText}</TableCell> */}
                {/* <TableCell>
                  {allocation.interviewees.length
                    ? allocation.interviewees.join(", ")
                    : "None"}
                </TableCell>
                <TableCell>{allocation.interviewers.join(", ")}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllocationTable;
