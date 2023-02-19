import express from 'express';

import {
  getAllInvoices,
  insertInvoice,
  deleteInvoice
} from './invoice.controller';

const router = express.Router();

router.get('/', getAllInvoices);
router.post('/', insertInvoice);
router.delete('/:invoiceId', deleteInvoice);

export default router;
