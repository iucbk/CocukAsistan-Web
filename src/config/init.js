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

conn.connect(
    function (err) { 
        if (err) { 
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
        }   
    });


module.exports = conn;