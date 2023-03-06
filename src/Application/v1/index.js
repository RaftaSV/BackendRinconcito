import express from 'express';

import userRouter from './Users/user.route';
import Images from './Images/images.route';
import platterRouter from './Platters/platter.route';
import categoryRouter from './Categories/category.route';
import costRouter from './Costs/cost.route';
import tableRouter from './Tables/table.route';
import orderRouter from './Orders/order.route';
import orderDetailRouter from './OrderDetails/orderDetail.route';
import invoiceRouter from './Invoices/invoice.route';
import invoiceDetailRouter from './InvoiceDetails/invoiceDetail.route';

const router = express.Router();

router.use('/User', userRouter);
router.use('/Image', Images);
router.use('/Categories', categoryRouter);
router.use('/Platters', platterRouter);
router.use('/Costs', costRouter);
router.use('/Tables', tableRouter);
router.use('/Orders', orderRouter);
router.use('/OrderDetails', orderDetailRouter);
router.use('/Invoices', invoiceRouter);
router.use('/InvoiceDetails', invoiceDetailRouter);

export default router;
