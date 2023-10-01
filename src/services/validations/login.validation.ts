import Joi from 'joi';
import { Login } from '../../types/Login';
import schemas from '../../utils/schemas';

const validateLogin = (loginData: Login): Joi.ValidationError | undefined => {
  const { error } = schemas.loginSchema.validate(loginData);
  if (error) throw error;
  return error;
};

export default validateLogin;