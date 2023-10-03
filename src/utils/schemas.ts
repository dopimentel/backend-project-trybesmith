import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.min': '"name" length must be at least 3 characters long',
  }),
  price: Joi.string().required().min(3).messages({
    'string.min': '"price" length must be at least 3 characters long',
  }),
  orderId: Joi.number().required(),
});

export default {
  loginSchema,
  createProductSchema,
};
