"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validlocation = exports.validUser = exports.validInventory = exports.matchPassword = exports.location = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// User Validation
var Joi = require('joi');

var _require = require('joi-password'),
    joiPassword = _require.joiPassword;

var bcrypt = require('bcryptjs');

var validUser = {
  body: Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    role: Joi.string().min(3).required(),
    mobilePhone: Joi.number().min(11).required(),
    password: joiPassword.string().minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required()
  })
};
exports.validUser = validUser;
var validInventory = {
  body: Joi.object({
    item_name: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    description: Joi.string().min(3),
    locations: Joi.array().items({
      store_id: Joi.number().min(1).required(),
      quantity: Joi.number().min(2).required()
    })
  })
};
exports.validInventory = validInventory;
var location = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    maker: Joi.string().min(3).required(),
    model: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    quantity: Joi.number().min(1).required(),
    item_condition: Joi.string().min(3).required(),
    acquired: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    Image: Joi.string().min(3)
  })
};
exports.location = location;
var validlocation = {
  body: Joi.object({
    store_name: Joi.string().min(3).required()
  })
}; // Compare password

exports.validlocation = validlocation;

var matchPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(enteredPassword, existingHashedPassword) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.compare(enteredPassword, existingHashedPassword);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function matchPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.matchPassword = matchPassword;