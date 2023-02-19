import express from 'express';

import userRouter from './Users/user.route';


const router = express.Router();

router.use('/User', userRouter);


export default router;
