import express from "express";
import * as controller from "../controller/kakao.js";

const router = express.Router();


router.post("/ready", controller.kakaoReady);
router.get("/approve", controller.kakaoApprove);
router.get("/status/:orderId", controller.kakaoStatus);

export default router;
