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

const createOrderSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  productIds: Joi.array().items(Joi.number()).required().min(1)
    .messages({
      'any.required': '"productIds" is required',
      'array.base': '"productIds" must be an array',
      // 'array.empty': '"productIds" must include only numbers',
      'array.min': '"productIds" must include only numbers',
    }),
}).options({ convert: false });

export default {
  loginSchema,
  createProductSchema,
  createOrderSchema,
};
