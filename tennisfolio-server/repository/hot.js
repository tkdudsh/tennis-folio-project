import pool from "../DB/connection.js";

export const getHotProducts = async () => {
    const sql = `SELECT 
                    id, 
                    category_id  AS categoryId, 
                    img_url      AS imgUrl, 
                    shop,
                    product      AS name,
                    price,
                    dc,
                    per,
                    no_dc        AS nodc
                 FROM best_product 
                 WHERE category_id = 8`;
    const result = await pool.execute(sql, []);
    return Array.isArray(result[0]) ? result[0] : [];
};
