const mysql = require('mysql');

function registerUser(full_name, email, hash){
    return new Promise(resolve => {
        const config = require('../config/db');
        const conn = new mysql.createConnection(config);

        let query = "INSERT INTO user (email, full_name, password) VALUES (?,?,?)";

        conn.query(query, [email, full_name, hash], (err) => {
                let insertErr = 0;
                if (err) insertErr = 1;

            conn.end((err)=>{
                if(err) throw err;
                resolve(insertErr);
            });
        });

    });
}


function isThereUser(email){
    return new Promise(resolve => {
        const config = require('../config/db');
        const conn = new mysql.createConnection(config);

        let query = "SELECT * FROM user WHERE email = ?";

        conn.query(query, [email], (err, results) => {
                let selectErr = 0;
                if (err) selectErr = 1;

                conn.end((err)=>{
                    if(err) throw err;
                    resolve({
                        selectErr: selectErr,
                        results: results
                    });
                });
            });

    });
}



exports.register = registerUser;
exports.isThereUser = isThereUser;
