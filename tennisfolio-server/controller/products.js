import * as repository from "../repository/products.js";

export const getHotProducts = async (req, res) => {
  const result = await repository.getHotProducts();
  res.json(result);
};
