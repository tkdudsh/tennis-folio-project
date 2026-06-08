// import cardData from "../../tennisfolio-front/src/data/cardData.js";

// export const getCardLists = async (req, res, next) => {
// 	try {
// 		res.json({ success: true, data: cardData });
// 	} catch (error) {
// 		next(error);
// 	}
// };

import * as repository from "../repository/cardLists.js";

export const getCardLists = async (req, res, next) => {
	try {
		const cardLists = await repository.getCardLists();
		res.json(cardLists);
	} catch (error) {
		next(error);
	}
};
