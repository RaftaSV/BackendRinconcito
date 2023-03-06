import express from 'express';
import {
  getAllUser,
  insertUser,
  login,
  validationToken,
  updateUser,
  deleteUser
} from './user.controller';

import { validation } from 'Utils/Authentication';
const router = express.Router();

router.get('/', validation, getAllUser);
router.post('/', insertUser);
router.post('/login', login);
router.post('/validation', validationToken);
router.put('/:userId',validation, updateUser);
router.delete('/:userId',validation, deleteUser);

export default router;
