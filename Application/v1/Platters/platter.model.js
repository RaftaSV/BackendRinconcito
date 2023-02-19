import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';

const PlatterModel = sequelize.define('platters', {
  platterId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platterName: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  cost: Sequelize.DOUBLE,
  platterDetail: Sequelize.STRING,
  platterImage: Sequelize.STRING,
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'plattersCategories',
      key: 'categoryId'
    }
  },
  platterStatus: Sequelize.INTEGER
});
PlatterModel.sync();
export default PlatterModel;
