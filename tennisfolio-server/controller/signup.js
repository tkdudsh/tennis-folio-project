import pool from '../DB/connection.js'; 
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { userId, password, name, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO member (id, pwd, name, email) VALUES (?, ?, ?, ?)';
        
        await pool.query(sql, [userId, hashedPassword, name, email]);
        
        res.status(201).json({ message: '회원가입 성공!' });
    } catch (error) {
        console.error("회원가입 중 에러:", error);
        res.status(500).json({ message: '서버 에러 발생' });
    }
};