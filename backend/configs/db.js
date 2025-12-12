const mysql = require('mysql2');
<COMMENT
const db = mysql.createConnection({
   host: 'database-1.ct60e6a2sl8x.ap-south-1.rds.amazonaws.com',
   port: '3306',
   user: 'appuser',
   password: 'rohini123',
   database: 'myappdb'
});
COMMENT>>
module.exports = db;
