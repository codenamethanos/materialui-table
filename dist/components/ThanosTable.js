"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _ThanosTableHead = _interopRequireDefault(require("./ThanosTableHead"));

var _ThanosTableToolbar = _interopRequireDefault(require("./ThanosTableToolbar"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750,
      borderCollapse: 'collapse',
      // CHANGE BELOW
      // https://stackoverflow.com/questions/53499803/make-table-header-and-first-two-columns-fixed
      whiteSpace: 'nowrap',
      tableLayout: 'auto'
    },
    container: function container(options) {
      return {
        maxHeight: options.maxTableHeight
      };
    },
    headerCellStyle: function headerCellStyle(options) {
      return _objectSpread({
        fontWeight: 'bold',
        backgroundColor: '#fff'
      }, options.headerCellStyle, {}, options.stickyHeader && {
        position: 'sticky',
        top: 0,
        zIndex: 100
      }, {
        width: options.minCellWidth
      });
    },
    headerStyleLeftFixed: function headerStyleLeftFixed(options) {
      return _objectSpread({
        fontWeight: 'bold',
        backgroundColor: '#fff'
      }, options.headerCellStyle, {}, options.stickyColumn && {
        position: 'sticky',
        left: 0,
        zIndex: 110
      }, {}, options.stickyHeader && {
        position: 'sticky',
        top: 0,
        zIndex: 110
      }, {
        width: options.minCellWidth
      });
    }
  };
});
var styles = {
  cellStyle: function cellStyle(props) {
    return props.cellStyle;
  }
};
var StyledTableCell = (0, _styles.withStyles)(styles)(function (_ref) {
  var classes = _ref.classes,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    classes: {
      root: classes.cellStyle
    }
  }, children);
});

function descendingComparator(a, b, orderBy, keyObject) {
  // If the orderBy key has a customSort, use customSort(b) instead of b[orderBy]
  if (keyObject[orderBy] && keyObject[orderBy].customSort) {
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
  return order === 'desc' ? function (a, b) {
    return descendingComparator(a, b, orderBy, keyObject);
  } : function (a, b) {
    return -descendingComparator(a, b, orderBy, keyObject);
  };
}

function stableSort(array, comparator) {
  var stabilizedThis = array.map(function (el, index) {
    return [el, index];
  });
  stabilizedThis.sort(function (a, b) {
    var order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(function (el) {
    return el[0];
  });
}

function ThanosTable(_ref2) {
  var columns = _ref2.columns,
      rows = _ref2.rows,
      options = _ref2.options;
  var classes = useStyles(options);

  var _useState = (0, _react.useState)('asc'),
      _useState2 = _slicedToArray(_useState, 2),
      order = _useState2[0],
      setOrder = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      orderBy = _useState4[0],
      setOrderBy = _useState4[1];

  var _useState5 = (0, _react.useState)(options.defaultPage || 0),
      _useState6 = _slicedToArray(_useState5, 2),
      page = _useState6[0],
      setPage = _useState6[1];

  var _useState7 = (0, _react.useState)(options.defaultRowsPerPage || 5),
      _useState8 = _slicedToArray(_useState7, 2),
      rowsPerPage = _useState8[0],
      setRowsPerPage = _useState8[1];

  var _useState9 = (0, _react.useState)(options.showColumns && options.showColumns.length > 0 ? columns.filter(function (x) {
    return options.showColumns.includes(x.key);
  }) : columns),
      _useState10 = _slicedToArray(_useState9, 2),
      visibleColumns = _useState10[0],
      setVisibleColumns = _useState10[1];

  var withDefaultOptions = _objectSpread({
    totalRow: true
  }, options);

  var handleRequestSort = function handleRequestSort(event, property) {
    var isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  var handleColumnChange = function handleColumnChange(property) {
    setVisibleColumns(property);
  };

  var handleChangePage = function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  var leftRow = 0;
  var leftFooter = 0;
  var currentActionElement = null;
  var keyObject = {};

  if (columns && columns.length > 0) {
    for (var i = 0, n = columns.length; i < n; i++) {
      if (!orderBy && orderBy.length === 0 && columns[i].defaultSort) {
        setOrder(columns[i].defaultSort);
        setOrderBy(columns[i]['key']);
      }

      keyObject[columns[i]['key']] = columns[i]; // Key is mandatory so this Object will be complete
    }
  }

  var sortedFirstPageRow = stableSort(rows, getComparator(order, orderBy, keyObject)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  var totalRow = {};
  var value = 0;

  if (columns && columns.length > 0 && sortedFirstPageRow && sortedFirstPageRow.length) {
    if (withDefaultOptions.totalRow) {
      for (var _i2 = 0, n1 = sortedFirstPageRow.length; _i2 < n1; _i2++) {
        for (var j = 0, n2 = columns.length; j < n2; j++) {
          if (!columns[j].customElement || !columns[j].actionElement) {
            value = 0;
            value = Number(sortedFirstPageRow[_i2][columns[j].key]) || 0;
            totalRow[columns[j]['key']] = totalRow[columns[j]['key']] ? totalRow[columns[j]['key']] + value : value;
            if (_i2 === n1 - 1) totalRow[columns[j]['key']] = Math.round(totalRow[columns[j]['key']] * 1e12) / 1e12; // Math.round((totalRow[columns[j].key]) * 1e12) / 1e12 ... is used to protect against floating point decimal issue. (https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue)
          } else {
            if (_i2 === 0) totalRow[columns[j]['key']] = 0;
          }
        }
      }
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_ThanosTableToolbar.default, {
    title: options.title || '',
    columns: columns,
    visibleColumns: visibleColumns,
    onColumnChange: handleColumnChange
  }), /*#__PURE__*/_react.default.createElement(_TableContainer.default, {
    className: classes.container
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    className: classes.table,
    "aria-labelledby": "tableTitle",
    "aria-label": "enhanced table"
  }, /*#__PURE__*/_react.default.createElement(_ThanosTableHead.default, {
    classes: classes,
    columns: visibleColumns,
    order: order,
    orderBy: orderBy,
    onRequestSort: handleRequestSort
  }), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, sortedFirstPageRow.map(function (row) {
    leftRow = 0;
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, null, visibleColumns.map(function (column, index) {
      if (!column.actionElement || leftRow) leftRow++;
      currentActionElement = null;
      if (column.actionElement) currentActionElement = column.actionElement(row);
      return /*#__PURE__*/_react.default.createElement(StyledTableCell, {
        cellStyle: column.columnCellStyle ? _objectSpread({
          backgroundColor: '#fff'
        }, column.columnCellStyle(row), {}, options.stickyColumn && leftRow === 1 && {
          position: 'sticky',
          left: 0,
          zIndex: 90
        }, {
          width: column.minColWidth || options.minCellWidth
        }) : _objectSpread({
          backgroundColor: '#fff'
        }, options.rowCellStyle, {}, options.stickyColumn && leftRow === 1 && {
          position: 'sticky',
          left: 0,
          zIndex: 90
        }, {
          width: column.minColWidth || options.minCellWidth
        })
      }, !(column.customElement || column.actionElement) ? row[column.key] : column.actionElement ? /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
        title: currentActionElement.toolTip
      }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
        onClick: function onClick(e) {
          return column.actionElement(row).onClick(row, e);
        },
        size: "small",
        disabled: currentActionElement.disabled,
        color: currentActionElement.color,
        component: "span"
      }, currentActionElement.icon)) : column.customElement(row));
    }));
  }), emptyRows > 0 && options.showEmptyRows && /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    style: {
      height: 53 * emptyRows
    }
  }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    colSpan: 6
  })), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, withDefaultOptions.totalRow ? visibleColumns.map(function (column, index) {
    if (!column.actionElement || leftFooter) leftFooter++;
    return /*#__PURE__*/_react.default.createElement(StyledTableCell, {
      cellStyle: column.columnCellStyle && !column.footerStylePriority ? _objectSpread({
        backgroundColor: '#fff'
      }, column.columnCellStyle(totalRow), {}, options.stickyFooter && {
        position: 'sticky',
        bottom: 0,
        zIndex: 100
      }, {}, options.stickyColumn && leftFooter === 1 && {
        position: 'sticky',
        left: 0,
        zIndex: 110
      }, {
        width: column.minColWidth || options.minCellWidth
      }) : _objectSpread({
        backgroundColor: '#fff'
      }, options.footerCellStyle, {}, options.stickyFooter && {
        position: 'sticky',
        bottom: 0,
        zIndex: 100
      }, {}, options.stickyColumn && leftFooter === 1 && {
        position: 'sticky',
        left: 0,
        zIndex: 110
      }, {
        width: column.minColWidth || options.minCellWidth
      })
    }, column.totalRow ? column.totalRowCellName ? column.totalRowCellName : column.customElement ? column.customElement(totalRow) : totalRow[column.key] : null);
  }) : null)))), /*#__PURE__*/_react.default.createElement(_TablePagination.default, {
    rowsPerPageOptions: options.pageOptions || [5, 10, 25],
    component: "div",
    count: rows.length,
    rowsPerPage: rowsPerPage,
    page: page,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage
  })));
}

var _default = ThanosTable;
exports.default = _default;