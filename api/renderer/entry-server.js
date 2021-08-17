"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var ReactDOMServer = require("react-dom/server");
var reactRouterDom = require("react-router-dom");
var React = require("react");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var ReactDOMServer__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOMServer);
var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
function App() {
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", null, " Hello World"));
}
function render(url, context) {
  return ReactDOMServer__default["default"].renderToString(/* @__PURE__ */ React__default["default"].createElement(reactRouterDom.StaticRouter, {
    location: url,
    context
  }, /* @__PURE__ */ React__default["default"].createElement(App, null)));
}
exports.render = render;
