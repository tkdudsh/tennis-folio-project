import { axiosGet } from "./dataAxios.js";

export const getHotProducts = async () => {
  const products = await axiosGet("/products/hot");
  return products;
};
