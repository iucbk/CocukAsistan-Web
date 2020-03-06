const conn = require("../config/db");

function getQuizById(id) {
  return new Promise(resolve => {
    let query =
      "SELECT quiz.quiz_id, quiz_title, question_content, options, true_option FROM cocukasistan.quiz INNER JOIN cocukasistan.question ON quiz.quiz_id = question.quiz_id WHERE quiz.quiz_id = ?;";
    conn.query(query, [id], (err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = getQuizById;
