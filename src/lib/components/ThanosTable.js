import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import ThanosTableHead from "./ThanosTableHead";
import ThanosTableToolbar from "./ThanosTableToolbar";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      borderCollapse: 'collapse'
    },
    container: options => ({
      maxHeight: options.maxTableHeight
    }),
    headerCellStyle: options => ({
      backgroundColor: '#fff',
      ...options.headerCellStyle, 
      ...(options.stickyHeader && {position: 'sticky', top: 0, zIndex: 100}), 
      minWidth: options.minCellWidth
    }),
    headerStyleLeftFixed: options => ({
      backgroundColor: '#fff',
      ...options.headerCellStyle, 
      ...(options.stickyColumn && {position: 'sticky', left: 0, zIndex: 110}),
      ...(options.stickyHeader && {position: 'sticky', top: 0, zIndex: 110}), 
      minWidth: options.minCellWidth
    })
}));

const styles = {
  cellStyle: props => (props.cellStyle)
};

const StyledTableCell = withStyles(styles)(({classes, children}) => {
  return(
    <TableCell classes={{ root: classes.cellStyle }}>
      {children}
    </TableCell>
  );
});

function descendingComparator(a, b, orderBy, keyObject) {
    // If the orderBy key has a customSort, use customSort(b) instead of b[orderBy]
    if(keyObject[orderBy] && keyObject[orderBy].customSort) {
      if (keyObject[orderBy].customSort(b) < keyObject[orderBy].customSort(a)) {
        return -1;
      }
      if (keyObject[orderBy].customSort(b) > keyObject[orderBy].customSort(a)) {
        return 1;
      }
      return 0;
    } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
}

function getComparator(order, orderBy, keyObject) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy, keyObject)
        : (a, b) => -descendingComparator(a, b, orderBy, keyObject);
}

function stableSort (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function ThanosTable({ columns, rows, options }) {
  const classes = useStyles(options);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(options.defaultPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(options.defaultRowsPerPage || 5);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  let keyObject = {};
  if(columns && columns.length > 0) { 
    for(let i=0, n=columns.length; i<n; i++) {
      if(!orderBy && orderBy.length === 0 && columns[i].defaultSort) {
        setOrder(columns[i].defaultSort);
        setOrderBy(columns[i]['key'])
      }
      keyObject[columns[i]['key']] = columns[i]; // Key is mandatory so this Object will be complete
    }
  }

  let sortedFirstPageRow = stableSort(rows, getComparator(order, orderBy, keyObject))
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  let totalRow = {};
  let value = 0;
  if(columns && columns.length > 0 && sortedFirstPageRow && sortedFirstPageRow.length) { 
    for(let i=0, n1=sortedFirstPageRow.length; i<n1; i++) {
      for(let j=0, n2=columns.length; j<n2; j++) {
        if(columns[j].totalRowCellName) {
          totalRow[columns[j]['key']] = columns[j].totalRowCellName;
        } 
        else if(columns[j].totalRow && !columns[j].customValue) { // Use only column.totalRow if you want to add customValue directly in totalRow. Also check comment below. 
          value = 0;
          // value = ((columns[j].key && !columns[j].customValue) ? (sortedFirstPageRow[i][columns[j].key]) : columns[j].customValue(sortedFirstPageRow[i])); // Use this if you want to add customValue directly in totalRow
          value = sortedFirstPageRow[i][columns[j].key];
          totalRow[columns[j]['key']] = (totalRow[columns[j]['key']] ? (totalRow[columns[j]['key']] + value) : value);
          if(i === (n1-1)) totalRow[columns[j]['key']] = Math.round((totalRow[columns[j]['key']]) * 1e12) / 1e12 // Math.round((totalRow[columns[j].key]) * 1e12) / 1e12 ... is used to protect against floating point decimal issue. (https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue)
        } else if(columns[j].totalRow && columns[j].customValue) {
          value = 0;
          totalRow[columns[j]['key']] = 0;
        }
        else {
          totalRow[columns[j]['key']] = '';
        }
      } 
    }
  }

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <ThanosTableToolbar title={options.title || ''} />
            <TableContainer className={classes.container}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <ThanosTableHead 
                        classes={classes}
                        columns={columns}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody> 
                        {sortedFirstPageRow.map((row) => {
                          return (
                            <TableRow>
                              {columns.map((column, index) => (
                                <StyledTableCell cellStyle={(column.key && column.columnCellStyle) 
                                                 ? ({backgroundColor: '#fff', ...column.columnCellStyle(row), 
                                                    ...(options.stickyColumn && (index === 0) && {position: 'sticky', left: 0, zIndex: 90}),
                                                    minWidth: (column.minColWidth || options.minCellWidth)}) 
                                                 : ({backgroundColor: '#fff', ...options.rowCellStyle, 
                                                    ...(options.stickyColumn && (index === 0) && {position: 'sticky', left: 0, zIndex: 90}),
                                                    minWidth: (column.minColWidth || options.minCellWidth)})}
                                >
                                  {(column.key && !column.customValue) ? (row[column.key]) : column.customValue(row) }
                                </StyledTableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && options.showEmptyRows && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        <TableRow>
                            {columns.map((column, index) => ( 
                              <StyledTableCell cellStyle={(column.key && column.columnCellStyle && !column.footerStylePriority) 
                                               ? ({backgroundColor: '#fff', ...column.columnCellStyle(totalRow), 
                                                 ...(options.stickyFooter && {position: 'sticky', bottom: 0, zIndex: 100}), 
                                                 ...(options.stickyColumn && (index === 0) && {position: 'sticky', left: 0, zIndex: 110}),
                                                 minWidth: (column.minColWidth || options.minCellWidth)}) 
                                               : ({backgroundColor: '#fff', ...options.footerCellStyle, 
                                                 ...(options.stickyFooter && {position: 'sticky', bottom: 0, zIndex: 100}), 
                                                 ...(options.stickyColumn && (index === 0) && {position: 'sticky', left: 0, zIndex: 110}),
                                                 minWidth: (column.minColWidth || options.minCellWidth)})}
                              >
                                {(column.key && !column.customValue) ? totalRow[column.key] : column.customValue(totalRow) }
                              </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={options.pageOptions || [5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
  );
}

export default ThanosTable;