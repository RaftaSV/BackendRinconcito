import jwt from 'jsonwebtoken';

import getConfig from '../config';

const { Token } = getConfig();
export const TokenValidation = (token) => {
  try {
    jwt.verify(token, Token.secret);
    return true;
  } catch (err) {
    console.log(`${err}`);
    return false;
  }
};

export function genToken(User) {
  try {
    return jwt.sign({ User }, Token.secret, {
      expiresIn: '1d',
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
