const conn = require("../config/db");

function login(body) {
  return new Promise(resolve => {
    let query =
      "SELECT * FROM cocukasistan.user WHERE email = ?";
    conn.query(query, [body.email], (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = login;
