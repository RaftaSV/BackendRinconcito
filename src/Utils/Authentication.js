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

export const validation = (req, res, next) => {
  const token = req.headers['authorization'];
  // Aquí puedes validar el token. Por ejemplo, puedes comprobar si el token es correcto y no ha expirado.
  try {
    jwt.verify(token, Token.secret);
    console.log('Token válido');
    next(); // Si el token es válido, se llama a la siguiente función middleware o ruta
  } catch (err) {
    console.log(`${err}`);
    res.status(401).send('Token no válido'); // Si el token no es válido, se envía una respuesta de error con un código 401
  }

}