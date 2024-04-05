// database/config.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banco_costureira',
  port: 3307 
});

connection.connect();

module.exports = connection;
