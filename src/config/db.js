const mysql = require('mysql');

const config =
{
    host: 'cocukasistan.mysql.database.azure.com',
    user: 'iucbk@cocukasistan',
    password: 'CocukAsistan@2020',
    database: 'cocukasistan',
    port: 3306
};

const conn = new mysql.createConnection(config);


module.exports = conn;