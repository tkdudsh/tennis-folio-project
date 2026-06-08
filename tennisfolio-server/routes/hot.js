import express from 'express';
import * as controller from '../controller/hot.js';

const router = express.Router();

router.get('/', controller.getHotProducts);

export default router;