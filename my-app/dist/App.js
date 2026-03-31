"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("./components/Home"));
var _Register = _interopRequireDefault(require("./components/Register"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  const [users, setUsers] = (0, _react.useState)([]);
  const addUser = newUser => {
    setUsers([...users, newUser]);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.HashRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "App",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          path: "/",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Home.default, {
            users: users,
            userCount: users.length
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          path: "/register",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Register.default, {
            onUserAdded: addUser
          })
        })]
      })
    })
  });
}
var _default = exports.default = App;