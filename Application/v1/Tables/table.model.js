import Sequelize from 'sequelize';
import { sequelize } from 'Server/db';

const TableModel = sequelize.define('restaurantTables', {
  tableId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tableNumber: Sequelize.INTEGER,
  tableStatus: Sequelize.INTEGER
});

TableModel.sync();

export default TableModel;
