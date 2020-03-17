

function update(body, hash) {

  return new Promise(resolve => {
    let query = "UPDATE user SET password = ? WHERE user_id = ?";

    conn.query(query, [hash, body.decoded_id], (err, results, fields) => {

        let updateErr = 0;
        if (err) updateErr = 1;
        
        resolve(updateErr);
    });
  });
}

module.exports = update;
