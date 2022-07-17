"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../index");

var findUserByEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _index.pool.query('select email from users where email=?', [email]);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUserByEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findUserByEmail = findUserByEmail;

var findUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user_id) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index.pool.query('select * from users where user_id=?', [user_id]);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUserById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findUserById = findUserById;

var createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(user) {
    var firstName, lastName, mobilePhone, email, password, role;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(user);
            firstName = user.firstName, lastName = user.lastName, mobilePhone = user.mobilePhone, email = user.email, password = user.password, role = user.role;
            _context3.next = 4;
            return _index.pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?', [firstName, lastName, mobilePhone, email, password, role]);

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createUser = createUser;