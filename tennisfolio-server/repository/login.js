import pool from "../DB/connection.js";

export const getPassword = async (id) => {
	const sql = ` select pwd, role from member where id = ?`;
	const [rows] = await pool.execute(sql, [id]);
	return rows[0];
};
