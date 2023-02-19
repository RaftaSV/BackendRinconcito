import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const CostModel = DatabaseConnection.define('costs', {
  costId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  costDetail: sequelize.STRING,
  cant: sequelize.DOUBLE,
  costDate: sequelize.DATEONLY,
  costStatus: sequelize.INTEGER
});

CostModel.sync();
export default CostModel;
