import sequelize from 'sequelize';
import { DatabaseConnection } from 'Server/db';

const TableModel = DatabaseConnection.define('restaurantTables', {
  tableId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tableNumber: sequelize.INTEGER,
  tableStatus: sequelize.INTEGER
});

TableModel.sync();

export default TableModel;
