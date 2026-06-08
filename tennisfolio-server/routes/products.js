import express from "express";
import * as controller from "../controller/products.js";

const router = express.Router();

router.get("/hot", controller.getHotProducts);

export default router;
