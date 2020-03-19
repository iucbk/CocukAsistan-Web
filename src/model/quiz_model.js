const mysql = require('mysql');
const config = require('../config/db');


function getQuizById(id) {
  return new Promise(resolve => {
    const conn = new mysql.createConnection(config);

    let query =
      "SELECT quiz.quiz_id, quiz_title, question_content, options, true_option FROM cocukasistan.quiz INNER JOIN cocukasistan.question ON quiz.quiz_id = question.quiz_id WHERE quiz.quiz_id = ?;";
    conn.query(query, [id], (err, results, fields) => {
      if (err) throw err;

      conn.end((err)=>{
        if(err) throw err;
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

      conn.end((err)=>{
        if(err) throw err;
        resolve(results);
      });
    });
  });
}


exports.getQuizById = getQuizById;
exports.getQuizCategories = getQuizCategories;
