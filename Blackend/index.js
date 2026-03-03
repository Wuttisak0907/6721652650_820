const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

// ✅ เชื่อม MySQL
const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });

        console.log('✅ MySQL Connected on 8820');
    } catch (error) {
        console.error('❌ MySQL Connection Error:', error.message);
        process.exit(1);
    }
};

// ====================== ROUTES ======================

// GET /users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error("❌ GET ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST /users
app.post('/users', async (req, res) => {
    try {
        console.log("📌 BODY RECEIVED:", req.body);

        const { firstname, lastname, age, gender, description, interests } = req.body;

        const [result] = await conn.query(
            `INSERT INTO users 
            (firstname, lastname, age, gender, description, interests)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [firstname, lastname, age, gender, description, interests]
        );

        console.log("✅ INSERT RESULT:", result);

        res.json({
            message: 'User created successfully',
            insertId: result.insertId
        });

    } catch (error) {
        console.error("❌ POST ERROR:", error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        console.log("📌 GET BY ID:", id);

        const [rows] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("❌ GET BY ID ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("📌 UPDATE ID:", id);
        console.log("📌 UPDATE DATA:", req.body);

        const [result] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [req.body, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });

    } catch (error) {
        console.error("❌ PUT ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        console.log("📌 DELETE ID:", id);

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error("❌ DELETE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

// ====================== START SERVER ======================

const startServer = async () => {
    await initMySQL();
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
};

startServer();
