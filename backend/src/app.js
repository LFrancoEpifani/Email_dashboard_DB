import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors'

const app = express();

app.use(cors())

const pool = createPool({
    user: 'root',
    password: 'admin',
    host: 'localhost',
    port: 3306,
    database: 'dashboard'
})

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
app.listen(3000, () => {
    console.log('Server running on port 3000');
});