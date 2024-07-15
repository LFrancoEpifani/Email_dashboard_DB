import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors'
import { PORT } from './config.JS';

const app = express();

app.use(cors())

const pool = createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});