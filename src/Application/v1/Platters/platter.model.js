import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const PlatterModel = DatabaseConnection.define('platters', {
  platterId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platterName: sequelize.STRING,
  price: sequelize.DOUBLE,
  cost: sequelize.DOUBLE,
  platterDetail: sequelize.STRING,
  platterImage: sequelize.STRING,
  categoryId: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'plattersCategories',
      key: 'categoryId'
    }
  },
  platterStatus: sequelize.INTEGER
});
PlatterModel.sync();
export default PlatterModel;
