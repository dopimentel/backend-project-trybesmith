import { User } from "../../src/types/User";

const validPassword = '123456';
const noEmailLogin = {
  password: validPassword,
};

const validEmailLogin = 'email@email.com';

const noPasswordLogin = {
  email: validEmailLogin,
};

export default {
  noEmailLogin,
  noPasswordLogin,
  validEmailLogin,
  validPassword,
}
