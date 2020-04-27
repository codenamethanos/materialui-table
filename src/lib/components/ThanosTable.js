import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  

function ThanosTable({ columns, rows }) {
    const classes = useStyles();

    let tableColumns = [];
    let tableRows = [];
    let tableCells = [];
    let keyArray = [];

    if(columns && columns.length > 0) {
        tableColumns = columns.map((column) => {
            keyArray.push(column['key']);
            return (
                <TableCell>{column['value']}</TableCell>
            )
        });

        if(tableColumns && tableColumns.length > 0 && 
            keyArray && keyArray.length > 0 &&
            rows && rows.length > 0) {
                tableRows = rows.map((row) => {
                    tableCells = [];
                    tableCells = keyArray.map((key) => (
                        <TableCell>{row[key]}</TableCell>
                    ));
                    return (
                        <TableRow>
                            {tableCells}
                        </TableRow>
                    )
                });
        }

    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {tableColumns}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ThanosTable;