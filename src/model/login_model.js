
function login(body) {
  return new Promise(resolve => {

    let query = "SELECT * FROM cocukasistan.user WHERE email = ?";

    conn.query(query, [body.email], (err, results, fields) => {

      if (err){
        resolve({
          db_error: 1
        });
      }
      resolve(results);
    });

  });
}

module.exports = login;
