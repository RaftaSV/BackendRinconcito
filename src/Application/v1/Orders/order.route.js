import express from 'express';

import {
  getAllOrders, insertOrder,
  updateOrder, deleteOrder
} from './order.controller';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', insertOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

export default router;
