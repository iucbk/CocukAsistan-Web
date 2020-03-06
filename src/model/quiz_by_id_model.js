const conn = require("../config/db");

function getQuizById(body) {
  return new Promise(resolve => {
    let query =
    "SELECT quiz.quiz_id, quiz_title, question_id, question_content FROM cocukasistan.quiz INNER JOIN cocukasistan.question ON quiz.quiz_id = question.quiz_id WHERE quiz.quiz_id = ? ;";
    conn.query(query, [body.quiz_id],(err, results, fields) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

module.exports = getQuizById;
