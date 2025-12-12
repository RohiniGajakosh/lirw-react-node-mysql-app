const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'database-1.ct60e6a2sl8x.ap-south-1.rds.amazonaws.com',
  user: 'appuser',
  password: 'rohini123',
  database: 'myappdb',
  port: 3306,
  connectionLimit: 5
});

module.exports = pool;
