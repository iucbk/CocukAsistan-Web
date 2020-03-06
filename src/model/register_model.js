const conn = require('../config/db');


function registerUser(body){
    
    return new Promise(resolve => {
        let query = "INSERT INTO user (email, full_name, password) VALUES (?,?,?)";

        conn.query(query, [body.email, body.full_name, body.password], (err) => {
                let message = 1;

                if (err) message = 0;
                
                resolve(message);
            });
    
    });
};


module.exports = registerUser;
