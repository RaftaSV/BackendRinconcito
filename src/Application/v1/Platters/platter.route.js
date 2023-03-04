import express from 'express';
import { validation } from 'Utils/Authentication';
import {
  getAllPlatters,
  insertPlatter,
  updatePlatter,
  deletePlatter
} from './platter.controller';

const router = express.Router();

router.get('/:categoryId', getAllPlatters);
router.post('/', validation, insertPlatter);
router.put('/:platterID', validation, updatePlatter);
router.delete('/:platterID', validation, deletePlatter);
export default router;
