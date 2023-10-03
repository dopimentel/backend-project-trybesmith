import { User } from "../../src/types/User";

const validUserLogin = 'ValidUser';
const validPassword = 'sortudo';

const noUsernameLogin = {
  password: validPassword,
};
const noPasswordLogin = {
  username: validUserLogin,
};

const notExistingUserLogin = {
  username: 'NotFoundUser',
  password: validPassword,
};

const userWithInvalidPassword = {
  username: validUserLogin,
  password: 'invalidPassword',
};

const hashPassword = '$2a$10$pr2RhcOmbv/KCDQF1RG1yOpfG.LzxsbsBSYTcxn5oJlJdwizNElsq';
const existingUser: User = {
  id: 1,
  username: validUserLogin,
  vocation: 'Druid',
  level: '100',
  password: hashPassword,
};

const validLogin = {
  username: validUserLogin,
  password: validPassword,
};

export default {
  noUsernameLogin,
  noPasswordLogin,
  notExistingUserLogin,
  userWithInvalidPassword,
  existingUser,
  validLogin,
};