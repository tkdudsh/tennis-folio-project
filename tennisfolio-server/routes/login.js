import express from "express";
import * as controller from "../controller/login.js";

const router = express.Router();

router.post("/", controller.getLogin);

export default router;
