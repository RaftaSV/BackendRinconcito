import express from 'express';
import { validation } from 'Utils/Authentication';
import {
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from './category.controller';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/',validation, insertCategory);
router.put('/:categoryId',validation, updateCategory);
router.delete('/:categoryId',validation, deleteCategory);
export default router;
