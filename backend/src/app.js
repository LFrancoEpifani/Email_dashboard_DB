import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './config.js';

const app = express();

const allowedOrigins = ['https://email-dashboard-up.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
};

app.use(cors(corsOptions));
app.use(express.json());

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
