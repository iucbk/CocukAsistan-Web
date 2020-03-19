const mysql = require('mysql');
const config = require('../config/db');


function login(body) {
  return new Promise(resolve => {

    const conn = new mysql.createConnection(config);
    let query = "SELECT * FROM cocukasistan.user WHERE email = ?";

    conn.query(query, [body.email], (err, results, fields) => {
      let db_error = 0;

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
      });

    });

  });
}


module.exports = login;
