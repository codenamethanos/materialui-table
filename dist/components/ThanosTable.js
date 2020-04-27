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
  var rows = _ref.rows;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_TableContainer.default, {
    component: _Paper.default
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    className: classes.table,
    "aria-label": "simple table"
  }, /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Dessert (100g serving)"), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    align: "right"
  }, "Calories"), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    align: "right"
  }, "Fat\xA0(g)"), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    align: "right"
  }, "Carbs\xA0(g)"), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    align: "right"
  }, "Protein\xA0(g)"))), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, rows.map(function (row) {
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      key: row.name
    }, /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      component: "th",
      scope: "row"
    }, row.name), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.calories), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.fat), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.carbs), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      align: "right"
    }, row.protein));
  }))));
}

var _default = ThanosTable;
exports.default = _default;