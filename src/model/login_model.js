const conn = require("../config/db");

function login(body) {
  return new Promise(resolve => {
    let query =
      "SELECT COUNT(user_id) as count FROM cocukasistan.user WHERE email = ? AND password = ?";
    conn.query(query, [body.email, body.password], (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = login;
