const mysql = require('mysql');

const config =
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cocukasistan',
    port: 3306
};

const conn = new mysql.createConnection(config);


module.exports = conn;