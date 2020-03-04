const conn = require('../config/db');


function registerUser(body){
    
    return new Promise(resolve => {
        let query = "INSERT INTO user (email, full_name, password) VALUES ('?','?','?')";

        conn.query(query, [body.email, body.full_name, body.password], (err) => {
                let message = "";
            
                if (err) message = "error";
                else message = "success";
                
                resolve({
                    code: null,
                    message: message,
                    data: null
                });
            });
    
    });
};


module.exports = registerUser;
