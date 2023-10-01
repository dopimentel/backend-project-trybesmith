import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';
import validateLogin from './validations/login.validation';

async function login(loginData: Login): Promise<Token> {
  const { username, password } = loginData;
  const error = validateLogin(loginData);
  if (error) throw error;
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    const err = new Error('Username or password invalid');
    err.name = 'Unauthorized';
    throw err;
  }
  const { id, username: usernameFromDB } = user.dataValues;

  const token = jwtUtil.sign({ id, username: usernameFromDB });
  return { token };
}

export default {
  login,
};