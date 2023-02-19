import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';

const CostModel = sequelize.define('costs', {
  costId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  costDetail: Sequelize.STRING,
  cant: Sequelize.DOUBLE,
  costDate: Sequelize.DATEONLY,
  costStatus: Sequelize.INTEGER
});

CostModel.sync();
export default CostModel;
