import express from 'express';
import { validation } from 'Utils/Authentication';

import { getAllTables, insertTable, updateTable } from './table.controller';

const router = express.Router();

router.get('/', validation,getAllTables);
router.post('/',validation ,insertTable);
router.put('/:tableId',validation, updateTable);
export default router;
