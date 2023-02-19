import { sequelize } from 'Server/db';
import Sequelize from 'Sequelize';

const InvoiceDetailModel = sequelize.define('invoiceDetails', {
  detailInvoiceId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unitPrice: Sequelize.DOUBLE,
  cost: Sequelize.DOUBLE,
  invoiceDetailsStatus: Sequelize.INTEGER,
  invoiceId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'invoices',
      key: 'invoiceId',
    },
    platterId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'platters',
        key: 'platterId',
      },
    }
  }
});

InvoiceDetailModel.sync();

export default InvoiceDetailModel;
