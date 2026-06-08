import pool from "../DB/connection.js";

export const getHotProducts = async () => {
  const sql = `
    SELECT
      id,
      img_url AS imgUrl,
      shop,
      product,
      price,
      dc,
      per,
      no_dc AS nodc,
      sub_img AS subImg
    FROM best_product
    WHERE id BETWEEN 0 AND 7
    ORDER BY id
  `;

  const [rows] = await pool.execute(sql);
  return rows;
};
