import pool from "../DB/connection.js";

const CATEGORY_MAP = {
    bag:        1,  // 가방
    item:       2,  // 테니스용품
    racquet:    3,  // 라켓
    woman:      4,  // 여성의류
    man:        5,  // 남성의류
    acc:        6,  // 패션잡화
    shoes:      7   // 신발
};

/**
 * 리뷰 목록 조회
 */
export const getReview = async() => {
    const sql = `SELECT
                    id,
                    rating,
                    percent,
                    text,
                    date
                FROM review`;
    const [rows] = await pool.execute(sql, []);
    return rows;
};

/**
 * HOT 상품 상세 조회
 */
export const getHotDetail = async(productId) => {
    const sql = `SELECT
                    id,
                    category_id AS categoryId,
                    img_url     AS imgUrl,
                    shop,
                    product,
                    price,
                    dc,
                    per,
                    no_dc       AS nodc,
                    sub_img     AS subImg
                FROM best_product
                WHERE category_id = 8
                AND id = ${productId}
                `;
    const [rows] = await pool.execute(sql, []);
    return rows[0] ?? null;
}

/**
 * BEST 카테고리 상품 상세 조회
 */
export const getBestDetail = async(subCategory, productId) => {
    const categoryId = CATEGORY_MAP[subCategory];
    if (!categoryId) return null;

    const sql = `SELECT
                    id,
                    category_id AS categoryId,
                    img_url     AS imgUrl,
                    shop,
                    product,
                    price,
                    dc,
                    per,
                    no_dc       AS nodc,
                    sub_img     AS subImg
                FROM best_product
                WHERE category_id = ${categoryId}
                AND id = ${productId};
                `;
    const [rows] = await pool.execute(sql, []);
    return rows[0] ?? null;
}