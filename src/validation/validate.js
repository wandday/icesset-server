// User Validation

import Joi from 'joi';
// import  joiPassword  from 'joi-password';
import  bcrypt  from 'bcryptjs';

export const validUser = {
    body: Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    role: Joi.string().min(3).required(),
    mobilePhone: Joi.number().min(11).required(),
    password: Joi.string().min(6).required()
  
      // password: joiPassword.string()
      // .minOfSpecialCharacters(1)
      // .minOfLowercase(1)
      // .minOfUppercase(1)
      // .minOfNumeric(1)
      // .noWhiteSpaces()
      // .required(),
    }),
};


export const validInventory = {
  body: Joi.object({
  item_name: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  supplier: Joi.string().min(3),
  supplierContact: Joi.string().min(3),
  locations: Joi.array().items({store_id: Joi.number().min(1).required(),
    store_name: Joi.string().min(3).required(),
    quantity: Joi.number().min(2).required(),
    user_id: Joi.number().min(1).required(),
    user_name: Joi.string().min(3).required()})
  }),
};

export const location = {
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
  }),
};

export const validlocation = {
  body: Joi.object({
  store_name: Joi.string().min(3).required(),
  
  }),
};


export const validPassword = {
  body: Joi.object({
  user_id: Joi.number().min(1).required(),
  resetString: Joi.string().min(1).required(),
  newPassword: Joi.string().min(6).required(),

  }),
};


export const validChangePassword = {
  body: Joi.object({
  userId: Joi.number().min(1).required(),
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),

  }),
};





// Compare password
export const matchPassword = async (enteredPassword, existingHashedPassword ) => {
  return await bcrypt.compare(enteredPassword, existingHashedPassword)
}

  