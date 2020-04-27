import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { TableRow } from "@material-ui/core";

function ThanosTableHead(props) {
    const { 
        classes, 
        columns,
        order, 
        orderBy, 
        onRequestSort 
    } = props;

    let tableColumns = [];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    if(columns && columns.length > 0) {
        tableColumns = columns.map((column) => {
            return (
                <TableCell
                    key={column['key']}
                    sortDirection={orderBy === column['key'] ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === column['key']}
                        direction={orderBy === column['key'] ? order : 'asc'}
                        onClick={createSortHandler(column['key'])}
                    >
                        {column['value']}
                        {orderBy === column['key'] ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            );
        });
    }

    return (
        <TableHead>
            <TableRow>
                {tableColumns}
            </TableRow>
        </TableHead>
    );
}

ThanosTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

export default ThanosTableHead;