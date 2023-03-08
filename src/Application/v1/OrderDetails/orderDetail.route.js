import express from 'express';
import { validation } from 'Utils/Authentication';
import {
  getAllOrderDetails,
  insertOrderDetail,
  deleteOrderDetail
} from './orderDetail.controller';

const router = express.Router();

router.get('/:orderId', validation, getAllOrderDetails);
router.post('/:orderId',validation, insertOrderDetail);
router.delete('/:detailsOrderId',validation, deleteOrderDetail);
export default router;
