import express from 'express';
import { validation } from 'Utils/Authentication';
import {
  getAllInvoiceDetails,
  insertInvoiceDetail
} from './invoiceDetail.controller';

const router = express.Router();

router.get('/:invoiceId', validation, getAllInvoiceDetails);
router.post('/:invoiceId', validation, insertInvoiceDetail);

export default router;
