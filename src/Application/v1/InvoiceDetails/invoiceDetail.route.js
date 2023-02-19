import express from 'express';
import {
  getAllInvoiceDetails,
  insertInvoiceDetail
} from './invoiceDetail.controller';

const router = express.Router();

router.get('/:invoiceId', getAllInvoiceDetails);
router.post('/:invoiceId', insertInvoiceDetail);

export default router;
