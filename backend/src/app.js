import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';

const app = express();
app.use(cors());

const pool = createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
});

app.get('/emails', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM emails');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching emails:', error.message);
        res.status(500).json({ error: 'Error fetching emails' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});