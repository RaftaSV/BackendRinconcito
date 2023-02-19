import Sequelize from 'sequelize';
import { sequelize } from 'Server/db';

const OrderModel = sequelize.define('orders', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderTime: {
    type: Sequelize.TIME,
  },
  orderDate: {
    type: Sequelize.DATEONLY,
  },
  orderType: {
    type: Sequelize.INTEGER
  },
  tableId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'restauranttables',
      key: 'tableId'
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId'
    }
  },
  orderStatus: {
    type: Sequelize.INTEGER
  }
});

OrderModel.sync();

export default OrderModel;
