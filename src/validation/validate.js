// User Validation

const Joi = require ('joi');
const { joiPassword } = require('joi-password');

export const validUser = {
    body: Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    role: Joi.string().min(3).required(),
    mobilePhone: Joi.number().min(11).required(),
  
      password: joiPassword.string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
    }),
  };

  