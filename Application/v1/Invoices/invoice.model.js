import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';

const InvoiceModel = sequelize.define('invoices', {
  invoiceId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceDate: {
    type: Sequelize.DATEONLY,
  },
  invoiceTime: {
    type: Sequelize.TIME,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId'
    },
  },
  invoiceTotal: Sequelize.DOUBLE,
  cash: Sequelize.DOUBLE,
  invoiceChange: Sequelize.DOUBLE,
  invoiceStatus: Sequelize.INTEGER,
});

InvoiceModel.sync();

export default InvoiceModel;
