"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.suspendUser = exports.findUserById = exports.findUserByEmail = exports.findAllUsers = exports.createUser = void 0;

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
            return _index.pool.query('select * from users where email=?', [email]);

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

var findAllUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _index.pool.query('select * from users');

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findAllUsers() {
    return _ref3.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var createUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user) {
    var firstName, lastName, mobilePhone, email, password, role;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(user);
            firstName = user.firstName, lastName = user.lastName, mobilePhone = user.mobilePhone, email = user.email, password = user.password, role = user.role;
            _context4.next = 4;
            return _index.pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?, userStatus=?', [firstName, lastName, mobilePhone, email, password, role, 'active']);

          case 4:
            return _context4.abrupt("return", _context4.sent);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createUser(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId, update) {
    var firstName, lastName, mobilePhone, email, password, role;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //  console.log(user)
            firstName = update.firstName, lastName = update.lastName, mobilePhone = update.mobilePhone, email = update.email, password = update.password, role = update.role;
            _context5.next = 3;
            return _index.pool.query('UPDATE users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?,  userStatus=? where user_id=?', [firstName, lastName, mobilePhone, email, password, role, 'active', userId]);

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateUser(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var suspendUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _index.pool.query('UPDATE users SET userStatus=? where user_id=?', ['suspended', userId]);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function suspendUser(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.suspendUser = suspendUser;