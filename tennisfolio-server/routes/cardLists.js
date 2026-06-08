// import express from "express";

// const router = express.Router();

// router.get("/", (req, res, next) => {
// 	try {
// 		res.json({ success: true });
// 	} catch (error) {
// 		next(error);
// 	}
// });

// export default router;

import express from "express";
import * as controller from "../controller/cardLists.js";

const router = express.Router();

router.get("/", controller.getCardLists);

export default router;
