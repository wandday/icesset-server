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
                _context.next = 2;
                return (0, _user.findUserByEmail)(user.email);

              case 2:
                result = _context.sent;

                if (!(result[0].length > 0)) {
                  _context.next = 9;
                  break;
                }

                err = new Error("User with ".concat(user.email, " already exist."));
                err.status = 400;
                throw err;

              case 9:
                _context.next = 11;
                return (0, _util.hashPassword)(user.password);

              case 11:
                user.password = _context.sent;
                _context.next = 14;
                return (0, _user.createUser)(user);

              case 14:
                _result = _context.sent;

                if (!_result) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", {
                  message: "User created successfully."
                });

              case 19:
                _err = new Error("Unable to create user.");
                _err.status = 400;
                throw _err;

              case 22:
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
                return _context2.abrupt("return", result);

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
  }]);
  return UserController;
}();

exports["default"] = UserController;