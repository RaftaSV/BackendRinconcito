import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const OrderDetailModel = DatabaseConnection.define('orderdetails', {
  detailsOrderId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: sequelize.INTEGER,
    references: {
      model: 'orders',
      key: 'orderId'
    }
  },
  platterId: {
    type: sequelize.INTEGER,
    references: {
      model: 'platters',
      key: 'platterId'
    }
  },
  platterPrice: {
    type: sequelize.DOUBLE
  },
  detailOrderStatus: sequelize.INTEGER
});

OrderDetailModel.sync();

export default OrderDetailModel;
