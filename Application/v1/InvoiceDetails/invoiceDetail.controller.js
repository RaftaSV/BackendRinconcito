import invoiceModel from '../Invoices/invoice.model';
import invoiceDetailModel from './invoiceDetail.model';
import platterModel from '../Platters/platter.model';

invoiceModel.hasMany(invoiceDetailModel, { foreignKey: 'invoiceId' });
invoiceDetailModel.belongsTo(invoiceModel, { foreignKey: 'invoiceId' });
platterModel.hasMany(invoiceDetailModel, { foreignKey: 'platterId' });
invoiceDetailModel.belongsTo(platterModel, { foreignKey: 'platterId' });

export const getAllInvoiceDetails = async (req, res) => {
  const { invoiceId } = req.params;
  try {
    if (invoiceId) {
      const data = await invoiceDetailModel.findAll({
        where: {
          invoiceId,
          invoiceDetailStatus: 0,
        }
      });
      return res.status(200).json(data);
    }
    return res.status(401).json({
      message: 'Error missing data'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error getting all invoices',
    });
  }
};

export const insertInvoiceDetail = async (req, res) => {
  const { invoiceId } = req.params;
  const {
    invoiceDetails
  } = req.body;

  if (!invoiceId || !invoiceDetails) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    // eslint-disable-next-line no-unreachable,no-restricted-syntax
    for (const platter of invoiceDetails) {
      // eslint-disable-next-line no-await-in-loop
      const platterPrice = await platterModel.findOne({
        where: {
          platterId: platter.platterId
        }
      });
      const newInvoiceDetail = {
        invoiceId,
        platterId: platter.platterId,
        invoiceDetailsStatus: 0,
        unitPrice: platterPrice.dataValues.price,
        cost: platterPrice.dataValues.cost,
      };
      console.log(newInvoiceDetail);
      invoiceDetailModel.create(newInvoiceDetail);
    }
    return res.status(200).json({
      message: 'Invoice detail inserted successfully'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error inserting invoice detail',
    });
  }
};
