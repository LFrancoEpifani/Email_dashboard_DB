import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());

const pool = createPool({
    user: 'root',
    password: 'admin',
    host: 'localhost',
    port: 3306,
    database: 'dashboard'
});

app.get('/emails', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM emails');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching emails:', error.message);
        res.status(500).json({ error: 'Error fetching emails' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
