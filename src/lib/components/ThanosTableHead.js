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

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    let leftHead = 0;

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => {
                    if(!column.actionElement || leftHead) leftHead++;
                    return (
                        <TableCell
                            classes={{ head: ((leftHead === 1) ? (classes.headerStyleLeftFixed) : (classes.headerCellStyle)) }}
                            key={column['key']} 
                            sortDirection={(!orderBy && (orderBy.length === 0) && column.defaultSort) 
                                ? column.defaultSort 
                                : (orderBy === column['key'] ? order : false)}
                        >
                            {!column.actionElement 
                            ? <TableSortLabel
                                active={(!orderBy && (orderBy.length === 0) && column.defaultSort) || (orderBy === column['key'])}
                                direction={(!orderBy && (orderBy.length === 0) && column.defaultSort) 
                                    ? column.defaultSort 
                                    : (orderBy === column['key'] ? order : 'asc')}
                                onClick={createSortHandler(column['key'])}
                            >
                                {column['title']}
                            </TableSortLabel>
                            : null
                            }
                        </TableCell>
                    );
                })}
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