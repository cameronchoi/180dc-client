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
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 900,
    [theme.breakpoints.up("sm")]: {
      minWidth: 1200,
    },
  },
  tableContainer: {
    maxHeight: 300,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      maxHeight: 450,
    },
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    borderTopStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#EAEAEA",
    borderRightStyle: "solid",
    borderLeftWidth: 1,
    borderLeftColor: "#EAEAEA",
    borderLeftStyle: "solid",
  },
  zoomLink: {
    maxWidth: 300,
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
            <TableCell>Interviewee(s)</TableCell>
            <TableCell>Interviewers</TableCell>
            <TableCell>Zoom Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allocations.map((allocation) => {
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
                  {allocation.interviewees.length
                    ? allocation.interviewees.join(", ")
                    : "None allocated yet"}
                </TableCell>
                <TableCell>{allocation.interviewers.join(", ")}</TableCell>
                <TableCell className={classes.zoomLink}>
                  {allocation.room ? (
                    <Link href={`${allocation.room}`} target="_blank">
                      <Typography noWrap={true} variant="body2">
                        {`${allocation.room}`}
                      </Typography>
                    </Link>
                  ) : (
                    "Zoom link has not been setup yet"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllocationTable;
