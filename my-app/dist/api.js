"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostUser = exports.GetUsers = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const API = "https://jsonplaceholder.typicode.com";
const GetUsers = async () => {
  try {
    const response = await _axios.default.get("".concat(API, "/users"));
    const users = response.data;
    const countUsers = users.length;
    return {
      users,
      countUsers
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.GetUsers = GetUsers;
const PostUser = async payload => {
  try {
    const response = await _axios.default.post("".concat(API, "/users"), payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.PostUser = PostUser;