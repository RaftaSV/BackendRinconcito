import express from 'express';
import {
  getAllOrderDetails,
  insertOrderDetail,
  deleteOrderDetail
} from './orderDetail.controller';

const router = express.Router();

router.get('/:orderId', getAllOrderDetails);
router.post('/:orderId', insertOrderDetail);
router.delete('/:detailsOrderId', deleteOrderDetail);
export default router;
