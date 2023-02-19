import sequelize from 'sequelize';
import { DatabaseConnection } from 'Server/db';
// creacion del modelo de la base de datos para su utilizacion en los controladores
const UserModel = DatabaseConnection.define('users', {
  userId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userNames: sequelize.STRING,
  lastName: sequelize.STRING,
  phone: sequelize.STRING,
  userName: sequelize.STRING,
  userPassword: sequelize.STRING,
  userType: sequelize.INTEGER,
  userStatus: sequelize.INTEGER
});
UserModel.sync();

export default UserModel;
