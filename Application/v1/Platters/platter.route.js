import express from 'express';
import {
  getAllPlatters,
  insertPlatter,
  updatePlatter,
  deletePlatter
} from './platter.controller';

const router = express.Router();

router.get('/:categoryId', getAllPlatters);
router.get('/', getAllPlatters);
router.post('/', insertPlatter);
router.put('/:platterID', updatePlatter);
router.delete('/:platterID', deletePlatter);
export default router;
