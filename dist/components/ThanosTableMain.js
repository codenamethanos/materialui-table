"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _ThanosTableHead = _interopRequireDefault(require("./ThanosTableHead"));

var _ThanosTableToolbar = _interopRequireDefault(require("./ThanosTableToolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  };
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? function (a, b) {
    return descendingComparator(a, b, orderBy);
  } : function (a, b) {
    return -descendingComparator(a, b, orderBy);
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

function ThanosTableMain(_ref) {
  var columns = _ref.columns,
      rows = _ref.rows;
  var classes = useStyles();

  var _React$useState = _react.default.useState('asc'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      order = _React$useState2[0],
      setOrder = _React$useState2[1];

  var _React$useState3 = _react.default.useState('calories'),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      orderBy = _React$useState4[0],
      setOrderBy = _React$useState4[1];

  var _React$useState5 = _react.default.useState(0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      page = _React$useState6[0],
      setPage = _React$useState6[1];

  var _React$useState7 = _react.default.useState(5),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      rowsPerPage = _React$useState8[0],
      setRowsPerPage = _React$useState8[1];

  var handleRequestSort = function handleRequestSort(event, property) {
    var isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  var handleChangePage = function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_ThanosTableToolbar.default, null), /*#__PURE__*/_react.default.createElement(_TableContainer.default, null, /*#__PURE__*/_react.default.createElement(_Table.default, {
    className: classes.table,
    "aria-labelledby": "tableTitle",
    "aria-label": "enhanced table"
  }, /*#__PURE__*/_react.default.createElement(_ThanosTableHead.default, {
    classes: classes,
    columns: columns,
    order: order,
    orderBy: orderBy,
    onRequestSort: handleRequestSort
  }), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (row, index) {
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      key: row.name
    }, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.name), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.calories), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.fat), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.carbs), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row.protein));
  }), emptyRows > 0 && /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    style: {
      height: 53 * emptyRows
    }
  }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    colSpan: 6
  }))))), /*#__PURE__*/_react.default.createElement(_TablePagination.default, {
    rowsPerPageOptions: [5, 10, 25],
    component: "div",
    count: rows.length,
    rowsPerPage: rowsPerPage,
    page: page,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage
  })));
}

var _default = ThanosTableMain;
exports.default = _default;