import { encryptPass, comparePass } from 'Utils/cryptPass';
import { genToken, TokenValidation } from 'Utils/Authentication';

import UserModel from './user.model';

// Este metodo es para la verificacion de los usuarios del sistema
export const login = async (req, res) => {
  const { body } = req;
  const { userName, pass } = body;
  try {
    // Se verifica que el nombre de ususario este registrado en la base de datos
    const user = await UserModel.findOne({
      where: { userName }
    });
    if (!user) {
      return res.status(404)
        .json({
          message: 'User not found'
        });
    }
    // se compara la contrasenia de la base de datos con la contrasenia ingresada
    const isMatch = await comparePass(pass, user.userPassword);
    if (!isMatch) {
      return res.status(401)
        .json({
          message: 'Invalid credentials',
        });
    }
    // se genera el json Web Token
    const token = genToken(user);
    return res.json({
      token,
      user
    });
  } catch (err) {
    return res.status(400).json({
      message: 'fatal error',
    });
  }
};
// con esta funcion se obtienen todos los usuarios del sistema que estan activos
export const getAllUser = async (req, res) => {

  const {userStatus} = req.params;

  if (userStatus===null || userStatus===undefined) {
  try {
    const data = await UserModel.findAll({
      where: { userStatus: 0 }
    });
    return res.status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res.status(500)
      .json({
        message: 'Error at get data',
        code: 500,
      });
  }
 } else if (userStatus===1) {
  try {
    const data = await UserModel.findAll({
      where: { userStatus }
    });
    return res.status(200)
      .json(data);
  } catch (error) {
    console.error(error);
    return res.status(500)
      .json({
        message: 'Error at get data',
        code: 500,
      });
  }
 }
 try {
  const data = await UserModel.findAll({
    where: { userStatus}
  });
  return res.status(200)
    .json(data);
} catch (error) {
  return res.status(500)
    .json({
      message: 'Error at get data',
      code: 500,
    });
  }
};

// con esta funcion se hace la insercion de nuevos usuarios
export const insertUser = async (req, res) => {
  const {
    name,
    lastName,
    phone,
    userName,
    password,
    userType,
    userStatus
  } = req.body;
  if (!name || !lastName || !phone || !userName || !password || !userType) {
    return res.status(401).json({
      message: 'Error falta datos'
    });
  }
  const user = await UserModel.findOne({
    where: {
      userName,
      userStatus: 0
    }
  });
  if (user) {
    return res.status(409).json({
      message: `El usuario ${userName} ya esta en uso`
    });
  }
  const newUser = {
    userNames: name,
    lastName,
    phone,
    userName,
    userPassword: await encryptPass(password),
    userType,
    userStatus
  };
  try {
    const data = await UserModel.create(newUser);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500)
      .json({
        message: 'Error al crear usuario',
        code: 500,
      });
  }
};

export const validationToken = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcion?? un token de autenticaci??n.' });
  }
  try {
    const validation = TokenValidation(token);
    if (validation === true) {
      return res.status(200).json({ message: 'El token es v??lido.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'El token es inv??lido.' });
  }
  return res.status(401).json({ message: 'El token es inv??lido.' });
};

// con esta funcion se hace la actualizacion de  usuarios
export const updateUser = async (req, res) => {
  const { body, params } = req;
  const { userId } = params;
  try {
    const user = await UserModel.findOne({
      where: {
        userName: body.userName,
        userStatus: 0
      }
    });
    if (user && parseInt(user.dataValues.userId, 10) !== parseInt(userId, 10)) {
      return res.status(409).json({
        message: `El usuario ${body.userName} ya esta en uso`
      });
    }
    if (!body.name
            || !body.lastName
            || !body.phone
            || !body.userName
            || !body.userType) {
      return res.status(401).json({
        message: 'Error falta datos'
      });     
    }
    if (!body.password) {
      await UserModel.update({
        userNames: body.name,
        lastName: body.lastName,
        phone: body.phone,
        userName: body.userName,
        userType: body.userType,
        userStatus: body.userStatus
      }, { where: { userId } });
      return res.status(200).json({
        message: 'Usuario actualizado sin contrase??a'
      });
    }
    const data = await UserModel.update({
      userNames: body.name,
      lastName: body.lastName,
      phone: body.phone,
      userName: body.userName,
      password: await encryptPass(body.password),
      userType: body.userType,
      userStatus: body.userStatus
    }, { where: { userId } });
    return res.status(200).json({
      message: 'Usuario actualizado'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Error al actualizar usuario'
    });
  }
};

export const deleteUser = async (req, res) => {
  const { params } = req;
  const { userId } = params;
  if (!userId) {
    return res.status(401).json({
      message: 'Error falta datos'
    });
  }
  try {
    const data = await UserModel.update({
      userStatus: 1
    }, { where: { userId } });
    console.log(data);
    return res.status(200).json({
      message: 'Usario eliminado'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Error al eliminar usuario'
    });
  }
};


