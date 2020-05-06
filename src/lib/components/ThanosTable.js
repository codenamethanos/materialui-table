import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import ThanosTableHead from "./ThanosTableHead";
import ThanosTableToolbar from "./ThanosTableToolbar";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: options => ({
      minWidth: 750,
      borderCollapse: 'collapse',
      whiteSpace: 'nowrap',
      tableLayout: 'auto',
      ...options.tableStyle
    }),
    container: options => ({
      maxHeight: options.maxTableHeight
    }),
    headerCellStyle: options => ({
      fontWeight: 'bold',
      backgroundColor: '#fff',
      ...options.headerCellStyle, 
      ...(options.stickyHeader && {position: 'sticky', top: 0, zIndex: 100}) 
    }),
    headerStyleLeftFixed: options => ({
      fontWeight: 'bold',
      backgroundColor: '#fff',
      ...options.headerCellStyle, 
      ...(options.stickyColumn && {position: 'sticky', left: 0, zIndex: 110}),
      ...(options.stickyHeader && {position: 'sticky', top: 0, zIndex: 110})
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
  const [visibleColumns, setVisibleColumns] = useState((options.showColumns && options.showColumns.length > 0) ? columns.filter(x => options.showColumns.includes(x.key)) : columns);

  let withDefaultOptions = {totalRow: true, ...options};
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleColumnChange = (property) => {
    setVisibleColumns(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  let leftRow = 0;
  let leftFooter = 0;
  let currentActionElement = null;

  let keyObject = {};
  if(columns && columns.length > 0) { 
    for(let i=0, n=columns.length; i<n; i++) {
      if(!orderBy && (orderBy.length === 0) && columns[i].defaultSort) {
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
    if(withDefaultOptions.totalRow) {
      for(let i=0, n1=sortedFirstPageRow.length; i<n1; i++) {
        for(let j=0, n2=columns.length; j<n2; j++) {
          value = 0;
          value = Number(sortedFirstPageRow[i][columns[j].key]) || 0; 
          totalRow[columns[j]['key']] = (totalRow[columns[j]['key']] ? (totalRow[columns[j]['key']] + value) : value);
          if(i === (n1-1)) totalRow[columns[j]['key']] = Math.round((totalRow[columns[j]['key']]) * 1e12) / 1e12 // Math.round((totalRow[columns[j].key]) * 1e12) / 1e12 ... is used to protect against floating point decimal issue. (https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue)
        } 
      }
    }
  }

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <ThanosTableToolbar 
              title={options.title || ''} 
              columns={columns} 
              visibleColumns={visibleColumns}
              onColumnChange={handleColumnChange}
            />
            <TableContainer className={classes.container}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <ThanosTableHead 
                        classes={classes}
                        columns={visibleColumns}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody> 
                        {sortedFirstPageRow.map((row) => {
                          leftRow = 0;
                          return (
                            <TableRow>
                              {visibleColumns.map((column, index) => {
                                if(!column.actionElement || leftRow) leftRow++;
                                currentActionElement = null;
                                if(column.actionElement) currentActionElement = column.actionElement(row);
                                return( 
                                  <StyledTableCell cellStyle={(column.columnCellStyle) 
                                                  ? ({backgroundColor: '#fff', ...column.columnCellStyle(row), 
                                                      ...(options.stickyColumn && (leftRow === 1) && {position: 'sticky', left: 0, zIndex: 90}),
                                                      width: column.actionElement ? (options.actionCellWidth || 50) : null, 
                                                      minWidth: column.minColWidth}) 
                                                  : ({backgroundColor: '#fff', ...options.rowCellStyle, 
                                                      ...(options.stickyColumn && (leftRow === 1) && {position: 'sticky', left: 0, zIndex: 90}),
                                                      width: column.actionElement ? (options.actionCellWidth || 50) : null,
                                                      minWidth: column.minColWidth})}
                                  >
                                    {(!(column.customElement || column.actionElement)) 
                                    ? row[column.key] 
                                    : (column.actionElement 
                                      ? (
                                        <Tooltip title={currentActionElement.toolTip}>
                                          <IconButton 
                                            onClick={(e) => column.actionElement(row).onClick(row, e)} 
                                            size="small" 
                                            disabled={currentActionElement.disabled} 
                                            color={currentActionElement.color} 
                                            component="span"
                                          >
                                            {currentActionElement.icon}
                                          </IconButton>
                                        </Tooltip>
                                      )
                                      : column.customElement(row) )}
                                  </StyledTableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                        {emptyRows > 0 && options.showEmptyRows && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        <TableRow>
                            {withDefaultOptions.totalRow
                              ? visibleColumns.map((column, index) => {
                              if(!column.actionElement || leftFooter) leftFooter++;
                              return(
                                <StyledTableCell cellStyle={(column.columnCellStyle && !column.footerStylePriority) 
                                                ? ({backgroundColor: '#fff', ...column.columnCellStyle(totalRow), 
                                                  ...(options.stickyFooter && {position: 'sticky', bottom: 0, zIndex: 100}), 
                                                  ...(options.stickyColumn && (leftFooter === 1) && {position: 'sticky', left: 0, zIndex: 110}),
                                                  width: column.actionElement ? (options.actionCellWidth || 50) : null, 
                                                  minWidth: column.minColWidth}) 
                                                : ({backgroundColor: '#fff', ...options.footerCellStyle, 
                                                  ...(options.stickyFooter && {position: 'sticky', bottom: 0, zIndex: 100}), 
                                                  ...(options.stickyColumn && (leftFooter === 1) && {position: 'sticky', left: 0, zIndex: 110}),
                                                  width: column.actionElement ? (options.actionCellWidth || 50) : null, 
                                                  minWidth: column.minColWidth})}
                                >
                                  {(column.totalRow && Object.keys(totalRow).length) // To prevent error if totalRow is empty. Happens if row is yet to load
                                    ? (column.totalRowCellName
                                      ? column.totalRowCellName 
                                      : (column.customElement 
                                        ? (column.customElement(totalRow)) 
                                        : (totalRow[column.key]))) 
                                    : null}
                                </StyledTableCell>
                              );
                            }) : null}
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