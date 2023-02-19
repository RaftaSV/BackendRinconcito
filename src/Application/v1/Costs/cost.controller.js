import sequelize, { Op } from 'sequelize';
import CostModel from './cost.model';
import InvoiceModel from '../Invoices/invoice.model';
import invoiceDetailModel from '../InvoiceDetails/invoiceDetail.model';

InvoiceModel.hasMany(invoiceDetailModel, { foreignKey: 'invoiceId' });
invoiceDetailModel.belongsTo(InvoiceModel, { foreignKey: 'invoiceId' });
export const getAllCosts = async (req, res) => {
  const { fecha } = req.params;
  try {
    const date = new Date(fecha);
    const month = date.toISOString().substring(5, 7);
    const year = date.getFullYear();
    const costs = await CostModel.findAll({
      where: {
        costStatus: 0,
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('costDate')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('costDate')), year),
        ],
      }
    });
    res.status(200).json(costs);
  } catch (error) {
    res.status(500).json(error);
  }
};
// eslint-disable-next-line consistent-return
export const sumAllCost = async (req, res) => {
  const { fecha } = req.params;
  try {
    const date = new Date(fecha);
    const month = date.toISOString().substring(5, 7);
    const year = date.getFullYear();
    const costs = await CostModel.sum('cant', {
      where: {
        costStatus: 0,
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('costDate')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('costDate')), year),
        ],
      }
    });
    const totalSale = await InvoiceModel.sum('invoiceTotal', {
      where: {
        invoiceStatus: 0,
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('invoiceDate')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('invoiceDate')), year),
        ],
      }
    });
    const unitPrice = await invoiceDetailModel.sum('unitPrice', {
      where: {
        invoiceDetailsStatus: 0,
      },
      include: [{
        model: InvoiceModel,
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('MONTH', sequelize.col('invoiceDate')), month),
            sequelize.where(sequelize.fn('YEAR', sequelize.col('invoiceDate')), year),
          ],
        },
      }],
    });
    const cost = await invoiceDetailModel.sum('cost', {
      where: {
        invoiceDetailsStatus: 0,
      },
      include: [{
        model: InvoiceModel,
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('MONTH', sequelize.col('invoiceDate')), month),
            sequelize.where(sequelize.fn('YEAR', sequelize.col('invoiceDate')), year),
          ],
        },
      }],
    });
    if (!costs && !totalSale) {
      return res.status(200).json({ totalCosts: 0, totalSale: 0, profits: 0 });
    }
    if (!costs) {
      return res.status(200).json(
        { totalCosts: 0, totalSales: totalSale, profits: unitPrice - cost });
    } if (!totalSale) {
      return res.status(200).json({ totalCosts: costs, totalSale: 0, profits: 0 });
    }
    res.status(200).json({ totalCosts: costs, totalSales: totalSale, profits: unitPrice - cost });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const insertCost = async (req, res) => {
  const { body } = req;
  const {
    costDetail, cant, costDate
  } = body;
  const costStatus = 0;
  if (!costDetail || !cant || !costDate) {
    return res.status(400).json({
      message: 'All data is missing',
    });
  }
  try {
    const newCost = {
      costDetail, cant, costDate, costStatus
    };
    await CostModel.create(newCost);
  } catch (error) {
    res.status(500).json(error);
  }
  return res.status(200).json({
    message: 'Costs created',
  });
};

export const updateCost = async (req, res) => {
  const { body } = req;
  console.log(body);
  const { costId } = req.params;
  const {
    costDetail, cant, costDate
  } = body;
  if (!costId || !costDetail || !cant || !costDate) {
    return res.status(400).json({
      message: 'Es necesario que inserte todos los datos',
    });
  }
  try {
    await CostModel.update({
      costDetail, cant, costDate
    }, { where: { costId } });
    return res.status(200).json({
      message: 'gastos actualizados',
    });
  } catch (error) {
    res.status(500).json(
      { message: 'Error al actualizar los datos' }
    );
  }
  return res.status(200).json({
    message: 'gastos actualizados',
  });
};

export const deleteCost = async (req, res) => {
  const { costId } = req.params;
  if (!costId) {
    return res.status(400).json({
      message: 'All data is missing',
    });
  }
  try {
    await CostModel.update({ costStatus: 1 },
      {
        where: { costId }
      });
  } catch (error) {
    res.status(500).json(error);
  }
  return res.status(200).json({
    message: 'Costs deleted'
  });
};
