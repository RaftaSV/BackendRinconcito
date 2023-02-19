import express from 'express';
import {
  getAllUser,
  insertUser,
  login,
  validationToken,
  updateUser,
  deleteUser,
  getUser
} from './user.controller';

const router = express.Router();

router.get('/', getAllUser);
router.post('/', insertUser);
router.post('/login', login);
router.post('/validation', validationToken);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/User', getUser);

export default router;
