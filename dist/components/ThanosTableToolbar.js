"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _FilterList = _interopRequireDefault(require("@material-ui/icons/FilterList"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useToolbarStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%'
    }
  };
});

function ThanosTableToolbar(props) {
  var classes = useToolbarStyles();
  return /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    className: (0, _clsx.default)(classes.root)
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title,
    variant: "h6",
    id: "tableTitle",
    component: "div"
  }, "Nutrition"), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Filter list"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "filter list"
  }, /*#__PURE__*/_react.default.createElement(_FilterList.default, null))));
}

var _default = ThanosTableToolbar;
exports.default = _default;