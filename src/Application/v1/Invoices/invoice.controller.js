import jwtDecode from 'jwt-decode';
import { getDate, getTime } from 'Utils/GetDate';
import invoiceModel from './invoice.model';

export const getAllInvoices = async (req, res) => {
  try {
    const data = await invoiceModel.findAll({
      where: {
        invoiceDate: getDate().newDate,
        invoiceStatus: 0,
      }
    });
    return res.status(200).json({
      data
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error getting all invoices',
    });
  }
};
export const insertInvoice = async (req, res) => {
  const token = req.header('auth-token');
  const decoded = jwtDecode(token);
  const {
    invoicesTotal,
    Cash,
    InvoiceChange,
  } = req.body;
  if (!invoicesTotal || !Cash || !InvoiceChange) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  const newInvoice = {
    invoiceDate: getDate().newDate,
    invoiceTime: getTime().currentTime,
    userId: decoded.User.userId,
    invoiceTotal: parseFloat(invoicesTotal),
    cash: parseFloat(Cash),
    invoiceChange: parseFloat(InvoiceChange),
    invoiceStatus: 0
  };
  try {
    const data = await invoiceModel.create(newInvoice);
    return res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

export const deleteInvoice = async (req, res) => {
  const { invoiceId } = req.params;
  if (!invoiceId) {
    return res.status(401).json({
      message: 'Error missing data'
    });
  }
  try {
    await invoiceModel.update({
      invoiceStatus: 1
    }, {
      where: {
        invoiceId
      }
    });
    return res.status(200).json({
      message: 'Invoice deleted'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'error deleting invoice',
    });
  }
};
