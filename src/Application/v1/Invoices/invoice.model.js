import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const InvoiceModel = DatabaseConnection.define('invoices', {
  invoiceId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoiceDate: {
    type: sequelize.DATEONLY,
  },
  invoiceTime: {
    type: sequelize.TIME,
  },
  userId: {
    type: sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId'
    },
  },
  invoiceTotal: sequelize.DOUBLE,
  cash: sequelize.DOUBLE,
  invoiceChange: sequelize.DOUBLE,
  invoiceStatus: sequelize.INTEGER,
});

InvoiceModel.sync();

export default InvoiceModel;
