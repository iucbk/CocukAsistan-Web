const mysql = require("mysql");

function update(body, hash) {
  return new Promise(resolve => {
    const config = require("../config/db");
    const conn = new mysql.createConnection(config);

    let query = "UPDATE user SET password = ? WHERE user_id = ?";

    conn.query(query, [hash, body.decoded_id], (err, results, fields) => {
      let updateErr = 0;
      if (err) updateErr = 1;

      conn.end(err => {
        if (err) throw err;
        resolve(updateErr);
      });
    });
  });
}

module.exports = update;
