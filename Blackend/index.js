const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const cors = require('cors');


const port = 8000;
const mysql = require('mysql2/promise');
app.use(bodyParser.json());
app.use(cors());

let users = []
let counter = 1;
let conn = null 
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user    : 'root',       
        password: 'root',
        database: 'webdb',
        port: 8820
    });
}
app.get('/testdb-new', async (req, res) => {
    try {

    const results = await conn.query('SELECT * FROM user');
    res.json(results[0]);
        
    } catch (error) {
        console.error("Database query error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


/**
 * GET /users สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
 * POST /users สำหรับเพิ่มผู้ใช้ใหม่
 * PUT /users/:id สำหรับอัปเดตข้อมูลผู้ใช้ที่มี id ตรงกับ :id
 *DELETE /users/:id สำหรับลบผู้ใช้ที่มี id ตรงกับ :id
 */


//path = GET /users สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
//path = GET /users สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users',async (req, res) => {
    const results = await conn.query('SELECT * FROM user');
    res.json(results[0]);
});

//ptah =  POST /users สำหรับเพิ่มผู้ใช้ใหม่
app.post('/users', async (req, res) => {
try {
     let user = req.body;
    const result = await conn.query('INSERT INTO user SET ?', user);
    res.json({
        message: 'User added successfully',
        data : {
            data : result[0],
        }
    });

} catch (error) {
    console.error("Database query error:", error.message);
    res.status(500).json({
        message: error.message,
        error: error.message
    });
}
});



//path = get /users/:id สำหรับดึงข้อมูลผู้ใช้ที่มี id ตรงกับ :id
app.get('/users/:id', async (req, res) => {
    try {
    let id = req.params.id;
    const result = await conn.query('SELECT * FROM user WHERE id = ?', [id]);
    if (result[0].length == 0) {
        throw{ statuscode: 404, message: 'User not found' };
    }
    res.json(result[0][0]);
    }catch (error) {
        console.error("Error fetching user:", error.message);
        let statusCode = error.statuscode || 500;
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        });

    }
});

//PUT /users/:id สำหรับอัปเดตข้อมูลผู้ใช้ที่มี id ตรงกับ :id
app.put('/users/:id', async (req, res) => {
    try {
    let id = req.params.id;
    const result = await conn.query('UPDATE user SET ? WHERE id = ?', [req.body, id]);
    if (result[0].affectedRows == 0) {
        throw{ statuscode: 404, message: 'User not found' };
    }
    res.json({
        message: 'User updated successfully',
        data: result[0]
    });


    }catch (error) {
        console.error("Error fetching user:", error.message);
        let statusCode = error.statuscode || 500;
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
}); 

// *DELETE /users/:id สำหรับลบผู้ใช้ที่มี id ตรงกับ :id

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM user WHERE id = ?', id);
        if (result[0].affectedRows == 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json({
            message: 'User deleted successfully',
            id: id
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});

app.listen(port, async() => {
    try {
        await initMySQL();
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        console.error("MySQL Connection Failed:", err.message);
    }
});
