import pool from "../DB/connection.js";

export const getCategories = async() => {
    // sql 쿼리 선언 + pool.execute
    const sql = `SELECT 
                    category_id     AS categoryId, 
                    img_url         AS imgUrl, 
                    name, 
                    count 
                FROM best_category;`;
    const result = await pool.execute(sql, []);
    return Array.isArray(result[0]) ? result[0] : [];
}

export const getBestProducts = async(categoryId) => {
    // sql 쿼리 선언 + pool.execute
    const sql = `SELECT 
                    id, 
                    category_id     AS categoryId, 
                    img_url         AS imgUrl, 
                    shop,
                    product,
                    price,
                    dc,
                    per,
                    no_dc           AS nodc,
                    sub_img         AS subImg
                FROM best_product 
                WHERE category_id = ?`;
    const result = await pool.execute(sql, [categoryId]);
    return Array.isArray(result[0]) ? result[0] : [];
}