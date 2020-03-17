

function getQuizCategories() {
  return new Promise(resolve => {
    let query =
      "SELECT quiz_category_id AS id, quiz_category_name AS name FROM cocukasistan.quizcategory;";
    conn.query(query, (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = getQuizCategories;
