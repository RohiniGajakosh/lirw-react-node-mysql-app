const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const pool = require('./configs/db'); // MariaDB pool

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test MariaDB connection at startup (async)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MariaDB Database');
    connection.release();
  } catch (err) {
    console.error('Error connecting to MariaDB:', err);
  }
})();

// Register routes
app.use('/api', routes);

module.exports = app;
