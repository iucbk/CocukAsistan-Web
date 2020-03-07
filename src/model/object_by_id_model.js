const conn = require("../config/db");

function getObjectById(id) {
  return new Promise(resolve => {
    let query =
      "SELECT * FROM Object WHERE Object.object_id = ?;";
    conn.query(query, [id], (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = getObjectById;
