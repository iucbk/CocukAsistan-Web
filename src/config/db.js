const mysql = require('mysql');

const config =
{
    host: 'cocukasistanmysql.mysql.database.azure.com',
    user: 'asistan@cocukasistanmysql',
    password: 'iucbkCocuk2020',
    database: 'cocukasistan',
    port: 3306
};

const conn = new mysql.createConnection(config);


module.exports = conn;