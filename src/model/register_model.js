const mysql = require('mysql');
const config = require('../config/db');


function registerUser(full_name, email, hash) {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = "INSERT INTO user (email, full_name, password) VALUES (?,?,?)";

        conn.query(query, [email, full_name, hash], (err) => {
            let db_error = 0;

            if (err) db_error = 1;

            conn.end((err) => {
                if (err) db_error = 1;

                resolve(db_error);
            });
        });

    });
}

function isThereUser(email) {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = "SELECT * FROM user WHERE email = ?";

        conn.query(query, [email], (err, results) => {
            let db_error = 0;

            if (err) db_error = 1;

            conn.end((err) => {
                if (err) db_error = 1;

                resolve({ db_error: db_error, results: results });
            });
        });

    });
}


exports.register = registerUser;
exports.isThereUser = isThereUser;
