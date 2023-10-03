import Joi from 'joi';
import { Login } from '../../types/Login';
import schemas from '../../utils/schemas';

const validateLogin = (loginData: Login): Joi.ValidationError | void => {
  const { error } = schemas.loginSchema.validate(loginData);
  if (error) throw error;
};

export default validateLogin;