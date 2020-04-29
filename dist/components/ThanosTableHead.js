"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ThanosTableHead(props) {
  var classes = props.classes,
      columns = props.columns,
      order = props.order,
      orderBy = props.orderBy,
      onRequestSort = props.onRequestSort;

  var createSortHandler = function createSortHandler(property) {
    return function (event) {
      onRequestSort(event, property);
    };
  };

  return /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_core.TableRow, null, columns.map(function (column) {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      key: column['key'],
      sortDirection: !orderBy && orderBy.length === 0 && column.defaultSort ? column.defaultSort : orderBy === column['key'] ? order : false
    }, /*#__PURE__*/_react.default.createElement(_TableSortLabel.default, {
      active: !orderBy && orderBy.length === 0 && column.defaultSort || orderBy === column['key'],
      direction: !orderBy && orderBy.length === 0 && column.defaultSort ? column.defaultSort : orderBy === column['key'] ? order : 'asc',
      onClick: createSortHandler(column['key'])
    }, column['title']));
  })));
}

ThanosTableHead.propTypes = {
  classes: _propTypes.default.object.isRequired,
  onRequestSort: _propTypes.default.func.isRequired,
  order: _propTypes.default.oneOf(['asc', 'desc']).isRequired,
  orderBy: _propTypes.default.string.isRequired
};
var _default = ThanosTableHead;
exports.default = _default;