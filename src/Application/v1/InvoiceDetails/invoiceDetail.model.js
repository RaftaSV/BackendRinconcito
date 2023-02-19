import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const InvoiceDetailModel = DatabaseConnection.define('invoiceDetails', {
  detailInvoiceId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unitPrice: sequelize.DOUBLE,
  cost: sequelize.DOUBLE,
  invoiceDetailsStatus: sequelize.INTEGER,
  invoiceId: {
    type: sequelize.INTEGER,
    references: {
      model: 'invoices',
      key: 'invoiceId',
    },
    platterId: {
      type: sequelize.INTEGER,
      references: {
        model: 'platters',
        key: 'platterId',
      },
    }
  }
});

InvoiceDetailModel.sync();

export default InvoiceDetailModel;
