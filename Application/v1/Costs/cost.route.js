import express from 'express';

import {
  getAllCosts, insertCost, updateCost, deleteCost, sumAllCost
} from './cost.controller';

const router = express.Router();

router.get('/:fecha', getAllCosts);
router.get('/sum/:fecha', sumAllCost);
router.post('/', insertCost);
router.put('/:costId', updateCost);
router.delete('/:costId', deleteCost);
export default router;
