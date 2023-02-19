import express from 'express';
import {
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from './category.controller';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', insertCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
export default router;
