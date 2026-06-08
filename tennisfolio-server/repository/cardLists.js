import pool from "../DB/connection.js";

export const getCardLists = async () => {
	// carddata 테이블에서 전체 데이터 조회
	// 테이블명은 DB에서 확인 후 맞게 수정해주세요
	const sql = `SELECT * FROM card_data`;
	const [rows] = await pool.execute(sql);
	return rows;
};
