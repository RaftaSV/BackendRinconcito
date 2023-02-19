import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';
// creacion del modelo de la base de datos para su utilizacion en los controladores
const UserModel = sequelize.define('users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userNames: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phone: Sequelize.STRING,
  userName: Sequelize.STRING,
  userPassword: Sequelize.STRING,
  userType: Sequelize.INTEGER,
  userStatus: Sequelize.INTEGER
});
UserModel.sync();

export default UserModel;
