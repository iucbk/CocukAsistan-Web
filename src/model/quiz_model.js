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
      let db_error = 0;

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
      });
    });

  });
}


function getCategories() {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);

    let query = `SELECT quiz.quiz_id, quizcategory.quiz_category_id AS category_id, quizcategory.quiz_category_name AS category_name 
        FROM quizcategory
        INNER JOIN quiz ON quizcategory.quiz_category_id = quiz.category_id`;
    conn.query(query, (err, results) => {
      let db_error = 0;

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
      });
    });
  });
}


function getCategoriesById(user_id) {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);

    let query = `SELECT quiz.quiz_id, quiz.category_id, solvedquiz.user_id FROM quiz
        LEFT JOIN solvedquiz ON quiz.quiz_id = solvedquiz.quiz_id
        WHERE solvedquiz.user_id = ?`;
    conn.query(query, [user_id], (err, results) => {
      let db_error = 0;

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
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
      let db_error = 0;

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
      });
    });
  });
}


exports.getQuizesByCategory = getQuizesByCategory;
exports.getQuizById = getQuizById;
exports.getCategories = getCategories;
exports.getCategoriesById = getCategoriesById;
