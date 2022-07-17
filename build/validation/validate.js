"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validUser = void 0;

// User Validation
var Joi = require('joi');

var _require = require('joi-password'),
    joiPassword = _require.joiPassword;

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