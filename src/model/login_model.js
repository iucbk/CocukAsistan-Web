const mysql = require("mysql");

function login(body) {
  return new Promise(resolve => {
    const config = require("../config/db");
    const conn = new mysql.createConnection(config);

    let query = "SELECT * FROM cocukasistan.user WHERE email = ?";

    conn.query(query, [body.email], (err, results, fields) => {
      if (err) {
        resolve({
          db_error: 1
        });
      }

      conn.end(err => {
        if (err) throw err;
        resolve(results);
      });
    });
  });
}

module.exports = login;
