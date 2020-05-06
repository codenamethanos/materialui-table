"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _ViewColumn = _interopRequireDefault(require("@material-ui/icons/ViewColumn"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useToolbarStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%'
    },
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  };
});

function getModalStyle() {
  var top = 50;
  var left = 50;
  return {
    top: "".concat(top, "%"),
    left: "".concat(left, "%"),
    transform: "translate(-".concat(top, "%, -").concat(left, "%)"),
    overflow: 'scroll',
    maxHeight: '80%'
  };
}

function ThanosTableToolbar(_ref) {
  var title = _ref.title,
      columns = _ref.columns,
      visibleColumns = _ref.visibleColumns,
      onColumnChange = _ref.onColumnChange;
  var classes = useToolbarStyles();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      viewListOpen = _useState2[0],
      setViewListOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(getModalStyle),
      _useState4 = _slicedToArray(_useState3, 1),
      modalStyle = _useState4[0];

  var _useState5 = (0, _react.useState)(visibleColumns),
      _useState6 = _slicedToArray(_useState5, 2),
      checked = _useState6[0],
      setChecked = _useState6[1];

  var handleViewList = function handleViewList() {
    setViewListOpen(true);
  };

  var handleViewListClose = function handleViewListClose() {
    setViewListOpen(false);
  };

  var handleToggle = function handleToggle(value) {
    return function () {
      var allChecked = _toConsumableArray(columns);

      var newChecked = _toConsumableArray(checked);

      var currentIndex = checked.indexOf(value);
      var difference;
      var diffIndex;

      if (currentIndex === -1) {
        newChecked.push(value);
        difference = allChecked.filter(function (x) {
          return !newChecked.includes(x);
        });

        for (var i = 0; i < difference.length; i++) {
          diffIndex = allChecked.indexOf(difference[i]);
          allChecked.splice(diffIndex, 1);
        }

        setChecked(allChecked);
      } else {
        newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
      }
    };
  };

  (0, _react.useEffect)(function () {
    // Need to use useEffect as setState is async
    onColumnChange(checked);
  }, [checked]);
  return /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    className: (0, _clsx.default)(classes.root)
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: classes.title,
    variant: "h6",
    id: "tableTitle",
    component: "div"
  }, title), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Add Or Remove Columns"
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    "aria-label": "add or remove columns",
    onClick: handleViewList
  }, /*#__PURE__*/_react.default.createElement(_ViewColumn.default, null))), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    open: viewListOpen,
    onClose: handleViewListClose
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: modalStyle,
    className: classes.modal
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    style: {
      fontWeight: 'bold'
    },
    align: "center"
  }, "Add Or Remove Columns"), /*#__PURE__*/_react.default.createElement(_List.default, {
    className: classes.root
  }, columns.map(function (column) {
    console.log("ABRA");
    console.log(checked);
    console.log(checked.indexOf(column));
    console.log(column);
    var labelId = "checkbox-list-label-".concat(column.key);
    return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      key: column.key,
      role: undefined,
      dense: true,
      button: true,
      onClick: handleToggle(column)
    }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      edge: "start",
      checked: checked.indexOf(column) !== -1,
      tabIndex: -1,
      disableRipple: true,
      inputProps: {
        'aria-labelledby': labelId
      }
    })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      id: labelId,
      primary: column.title
    }));
  })))));
}

var _default = ThanosTableToolbar;
exports.default = _default;