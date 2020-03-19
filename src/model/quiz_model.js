const mysql = require("mysql");
const config = require("../config/db");

function getQuizById(id) {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);

    let query = `SELECT quiz.quiz_id, quiz_title, question_content, options, true_option 
      FROM cocukasistan.quiz 
      INNER JOIN cocukasistan.question ON quiz.quiz_id = question.quiz_id 
      WHERE quiz.quiz_id = ?;`;
    conn.query(query, [id], (err, results, fields) => {
      if (err) throw err;

      conn.end(err => {
        if (err) throw err;
        resolve(results);
      });
    });
  });
}

function getQuizCategories() {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);

    let query =
      "SELECT quiz_category_id AS id, quiz_category_name AS name FROM cocukasistan.quizcategory;";
    conn.query(query, (err, results, fields) => {
      if (err) throw err;

      conn.end(err => {
        if (err) throw err;
        resolve(results);
      });
    });
  });
}

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

exports.getQuizesByCategory = getQuizesByCategory;
exports.getQuizById = getQuizById;
exports.getQuizCategories = getQuizCategories;
