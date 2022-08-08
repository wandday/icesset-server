"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _user = require("../models/user");

var _util = require("../utility/util");

var _TokenController = _interopRequireDefault(require("./TokenController"));

var bcrypt = require('bcryptjs');

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, [{
    key: "createUser",
    value: function () {
      var _createUser2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        var result, err, _result, _err;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(user);
                _context.next = 3;
                return (0, _user.findUserByEmail)(user.email);

              case 3:
                result = _context.sent;

                if (!(result[0].length > 0)) {
                  _context.next = 10;
                  break;
                }

                err = new Error("User with ".concat(user.email, " already exist."));
                err.status = 400;
                throw err;

              case 10:
                _context.next = 12;
                return (0, _util.hashPassword)(user.password);

              case 12:
                user.password = _context.sent;
                _context.next = 15;
                return (0, _user.createUser)(user);

              case 15:
                _result = _context.sent;

                if (!_result) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", {
                  message: "User created successfully."
                });

              case 20:
                _err = new Error("Unable to create user.");
                _err.status = 400;
                throw _err;

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUser(_x) {
        return _createUser2.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
        var result, err;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _user.findUserById)(userId);

              case 2:
                result = _context2.sent;

                if (!(result[0].length < 1)) {
                  _context2.next = 9;
                  break;
                }

                err = new Error("User with ".concat(userId, "  does not exist."));
                err.status = 400;
                throw err;

              case 9:
                return _context2.abrupt("return", result[0][0]);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUser(_x2) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var result, err;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _user.findAllUsers)();

              case 2:
                result = _context3.sent;

                if (result) {
                  _context3.next = 9;
                  break;
                }

                err = new Error("Could not retrive users");
                err.status = 400;
                throw err;

              case 9:
                return _context3.abrupt("return", result[0]);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "logUserIn",
    value: function () {
      var _logUserIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(logUser) {
        var user, tokenController, err, correct, token, _err2;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _user.findUserByEmail)(logUser.email);

              case 2:
                user = _context4.sent;
                user = user[0][0];
                tokenController = new _TokenController["default"]();

                if (user) {
                  _context4.next = 9;
                  break;
                }

                err = new Error("User with ".concat(logUser.email, " does not  exist."));
                err.status = 404;
                throw err;

              case 9:
                correct = bcrypt.compareSync(logUser.password, user.password);

                if (!(user && correct)) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 13;
                return tokenController.generateToken(user);

              case 13:
                token = _context4.sent;
                return _context4.abrupt("return", {
                  accessToken: "Bearer ".concat(token),
                  role: user.role,
                  info: user
                });

              case 17:
                _err2 = new Error("Incorrect Credentials.");
                _err2.status = 203;
                throw _err2;

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function logUserIn(_x3) {
        return _logUserIn.apply(this, arguments);
      }

      return logUserIn;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, update) {
        var result, err, response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _user.findUserById)(userId);

              case 2:
                result = _context5.sent;

                if (!(result[0].length < 1)) {
                  _context5.next = 9;
                  break;
                }

                err = new Error("User with ".concat(userId, "  does not exist."));
                err.status = 400;
                throw err;

              case 9:
                _context5.next = 11;
                return (0, _util.hashPassword)(update.password);

              case 11:
                update.password = _context5.sent;
                _context5.next = 14;
                return (0, _user.updateUser)(userId, update);

              case 14:
                response = _context5.sent;

                if (!response) {
                  _context5.next = 17;
                  break;
                }

                return _context5.abrupt("return", {
                  response: response
                });

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateUser(_x4, _x5) {
        return _updateUser2.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "suspendUser",
    value: function () {
      var _suspendUser2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
        var result, err, response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _user.findUserById)(userId);

              case 2:
                result = _context6.sent;

                if (!(result[0].length < 1)) {
                  _context6.next = 9;
                  break;
                }

                err = new Error("User with ".concat(userId, "  does not exist."));
                err.status = 400;
                throw err;

              case 9:
                _context6.next = 11;
                return (0, _user.suspendUser)(userId);

              case 11:
                response = _context6.sent;

                if (!response) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt("return", {
                  response: response
                });

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function suspendUser(_x6) {
        return _suspendUser2.apply(this, arguments);
      }

      return suspendUser;
    }()
  }]);
  return UserController;
}();

exports["default"] = UserController;