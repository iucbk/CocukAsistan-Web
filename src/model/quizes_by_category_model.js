const mysql = require("mysql");
const config = require("../config/db");

function getQuizesByCategory(user_id, category_id) {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);
    let query = `SELECT quiz.quiz_id, quiz_title, NOT ISNULL(solved_quiz_id) as isSolved
        FROM cocukasistan.quiz
        LEFT JOIN cocukasistan.solvedquiz ON quiz.quiz_id = solvedquiz.quiz_id 
        AND solvedquiz.user_id = ?
        WHERE quiz.category_id = ?`;
    conn.query(query, [user_id, category_id], (err, results, fields) => {
      let dbError = false;
      if (err) dbErr = true;

      conn.end(err => {
        resolve({
          dbError: dbError,
          quizes: results
        });
      });
    });
  });
}

module.exports = getQuizesByCategory;
