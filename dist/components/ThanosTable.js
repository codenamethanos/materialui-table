"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)({
  table: {
    minWidth: 650
  }
});

function ThanosTable(_ref) {
  var columns = _ref.columns,
      rows = _ref.rows;
  var classes = useStyles();
  var tableColumns = [];
  var tableRows = [];
  var tableCells = [];
  var keyArray = [];

  if (columns && columns.length > 0) {
    tableColumns = columns.map(function (column) {
      keyArray.push(column['key']);
      return /*#__PURE__*/_react.default.createElement(_TableCell.default, null, column['value']);
    });

    if (tableColumns && tableColumns.length > 0 && keyArray && keyArray.length > 0 && rows && rows.length > 0) {
      tableRows = rows.map(function (row) {
        tableCells = [];
        tableCells = keyArray.map(function (key) {
          return /*#__PURE__*/_react.default.createElement(_TableCell.default, null, row[key]);
        });
        return /*#__PURE__*/_react.default.createElement(_TableRow.default, null, tableCells);
      });
    }
  }

  return /*#__PURE__*/_react.default.createElement(_TableContainer.default, {
    component: _Paper.default
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    className: classes.table
  }, /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, tableColumns)), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, tableRows)));
}

var _default = ThanosTable;
exports.default = _default;