const mysql = require('mysql');
const config = require('../config/db');


function update(body, hash) {
  return new Promise(resolve => {

    const conn = new mysql.createConnection(config);
    let query = "UPDATE user SET password = ? WHERE user_id = ?";

    conn.query(query, [hash, body.decoded_id], (err, results, fields) => {

      let db_error = 0;
      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve(db_error);
      });

    });
  });
}


module.exports = update;
