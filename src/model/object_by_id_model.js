const mysql = require('mysql');
const config = require('../config/db');


function getObjectById(id) {
  return new Promise(resolve => {

    const conn = new mysql.createConnection(config);
    let query =
      "SELECT Object.object_id, Object.name, Category.name, Attribute.name, ObjectAttributes.value FROM Object INNER JOIN ObjectAttributes ON Object.category_id=ObjectAttributes.category_id INNER JOIN Attribute ON Attribute.attribute_id = ObjectAttributes.attribute_id INNER JOIN Category_Attribute ON Category_Attribute.attribute_id = Attribute.attribute_id INNER JOIN Category ON  Category.category_id = Object.category_id WHERE Object.object_id = ?;";
    conn.query(query, [id], (err, results, fields) => {
      let db_error = 0

      if (err) db_error = 1;

      conn.end((err) => {
        if (err) db_error = 1;

        resolve({ db_error: db_error, results: results });
      });
    });

  });
}


module.exports = getObjectById;
