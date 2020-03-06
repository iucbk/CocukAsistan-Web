const conn = require("../config/db");

function getQuizCategories() {
  return new Promise(resolve => {
    let query =
      "SELECT * FROM cocukasistan.quizcategory;";
    conn.query(query, (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = getQuizCategories;
