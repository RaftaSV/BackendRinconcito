import sequelize from 'sequelize';
import getConfig from '../config';

const { database } = getConfig();

export const DatabaseConnection = new sequelize(
  database.database,
  database.user,
  database.password,
  {
    host: database.host,
    port: database.port,
    dialect: database.dialect,
    define: {
      timestamps: false
    },
    dialectOptions: {
      connectTimeout: 60000, // 30 segundos
    },
  });

export const initializeDB = async () => {
  DatabaseConnection.authenticate()
    .then(() => {
      console.log(`connected at database ${database.database}`);
    })
    .catch(() => {
      console.log('connection failed');
    });
};
