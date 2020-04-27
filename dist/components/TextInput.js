"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./TextInput.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = function TextInput(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? "text" : _ref$type,
      label = _ref.label,
      placeholder = _ref.placeholder,
      value = _ref.value,
      _onChange = _ref.onChange,
      helpText = _ref.helpText;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "simple-form-group"
  }, label && /*#__PURE__*/_react.default.createElement("label", {
    className: "simple-text-label"
  }, label), /*#__PURE__*/_react.default.createElement("input", {
    type: type,
    className: "simple-text-input",
    value: value,
    onChange: function onChange(e) {
      return _onChange && _onChange(e.target.value);
    },
    placeholder: placeholder
  }), helpText && /*#__PURE__*/_react.default.createElement("small", {
    className: "simple-form-text"
  }, helpText));
};

var _default = TextInput;
exports.default = _default;