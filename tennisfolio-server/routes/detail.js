import express from 'express';
import * as controller from '../controller/detail.js';

const router = express.Router();
/**
 * 리뷰 목록
 */
router.get('/review', controller.getReview);
/**
 * HOT 상품 상세
 */
router.get('/hot/:id', controller.getHotDetail);
/**
 * BEST 상품 상세
 */
router.get('/best/:subCategory/:id', controller.getBestDetail);

export default router;