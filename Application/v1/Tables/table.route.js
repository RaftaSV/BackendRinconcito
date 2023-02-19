import express from 'express';

import { getAllTables, insertTable, updateTable } from './table.controller';

const router = express.Router();

router.get('/', getAllTables);
router.post('/', insertTable);
router.put('/:tableId', updateTable);
export default router;
