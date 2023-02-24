import express from 'express';
import { validation } from 'Utils/Authentication';

import {
  getAllCosts, insertCost, updateCost, deleteCost, sumAllCost
} from './cost.controller';

const router = express.Router();

router.get('/:fecha',validation, getAllCosts);
router.get('/sum/:fecha',validation, sumAllCost);
router.post('/', validation, insertCost);
router.put('/:costId', validation, updateCost);
router.delete('/:costId',validation, deleteCost);
export default router;
