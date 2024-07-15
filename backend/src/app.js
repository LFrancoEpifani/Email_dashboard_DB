// app.js
import 'dotenv/config';  // Añade esta línea al inicio del archivo
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();
app.use(cors());

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
