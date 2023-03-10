import sequelize from 'sequelize';
import { DatabaseConnection } from 'Server/db';

const OrderModel = DatabaseConnection.define('orders', {
  orderId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderTime: {
    type: sequelize.TIME,
  },
  orderDate: {
    type: sequelize.DATEONLY,
  },
  orderType: {
    type: sequelize.INTEGER
  },
  address: {
    type: sequelize.STRING
  },
  customer: {
    type: sequelize.STRING
  },
  numberPhone: {
    type: sequelize.STRING
  },
  tableId: {
    type: sequelize.INTEGER,
    references: {
      model: 'restauranttables',
      key: 'tableId'
    }
  },
  userId: {
    type: sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId'
    }
  },
  orderStatus: {
    type: sequelize.INTEGER
  }
});

OrderModel.sync();

export default OrderModel;
