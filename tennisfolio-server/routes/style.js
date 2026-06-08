import express from 'express';
import pool from '../DB/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM style_data"); 
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '데이터 불러오기 실패' });
    }
});

export default router;