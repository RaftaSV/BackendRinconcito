import express from 'express';
import { renderImage } from './images.controller';

const router = express.Router();

router.get('/:dir/:image', renderImage);
export default router;
