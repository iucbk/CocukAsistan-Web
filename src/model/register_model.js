const conn = require('../config/db');


function registerUser(full_name, email, hash){
    
    return new Promise(resolve => {
        let query = "INSERT INTO user (email, full_name, password) VALUES (?,?,?)";

        conn.query(query, [email, full_name, hash], (err) => {
                let insertErr = 0;

                if (err) insertErr = 1;
                
                resolve(insertErr);

            });
    
    });
};


module.exports = registerUser;
