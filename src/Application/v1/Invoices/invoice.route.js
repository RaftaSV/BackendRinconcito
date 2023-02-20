import express from 'express';
import { validation } from 'Utils/Authentication';

import {
  getAllInvoices,
  insertInvoice,
  deleteInvoice
} from './invoice.controller';

const router = express.Router();

router.get('/',validation, getAllInvoices);
router.post('/',validation, insertInvoice);
router.delete('/:invoiceId', validation, deleteInvoice);

export default router;
