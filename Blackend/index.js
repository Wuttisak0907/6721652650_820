//ทำการimport http module
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่าเริ่มต้นของserver เมื่อเปิดใช้งาน เว็บไซต์

const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('My First Server ');
}

//run
const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
