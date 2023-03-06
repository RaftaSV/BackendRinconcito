import express from 'express';
import { validation } from 'Utils/Authentication';

import {
  getAllOrders, insertOrder,
  updateOrder, deleteOrder
} from './order.controller';

const router = express.Router();

router.get('/:fecha', validation, getAllOrders);
router.post('/', insertOrder);
router.put('/:orderId',validation, updateOrder);
router.delete('/:orderId',validation, deleteOrder);

export default router;
