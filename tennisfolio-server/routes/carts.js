import express from "express";
import * as controller from "../controller/carts.js";

const router = express();


router.post("/delete",controller.deleteItems);
router.post("/add", controller.addToCart);
router.get("/list", controller.getCartItems);
router.post("/update", controller.updateItems);

export default router;