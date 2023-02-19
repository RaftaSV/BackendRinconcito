import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';

const OrderDetailModel = sequelize.define('orderdetails', {
  detailsOrderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'orders',
      key: 'orderId'
    }
  },
  platterId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'platters',
      key: 'platterId'
    }
  },
  platterPrice: {
    type: Sequelize.DOUBLE
  },
  detailOrderStatus: Sequelize.INTEGER
});

OrderDetailModel.sync();

export default OrderDetailModel;
