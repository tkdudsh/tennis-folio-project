import express from 'express';
import * as controller from '../controller/best.js';

const router = express.Router();

router.get('/categories', controller.getCategories);
router.get('/products', controller.getBestProducts);

export default router;