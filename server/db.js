const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'Jaiswalll@13', // Replace with your MySQL password
  database: 'google_auth', // Replace with your database name
});

module.exports = pool.promise();
