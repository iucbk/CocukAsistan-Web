const conn = require('../config/db');


function readData(name){
    
    return new Promise(resolve => {
        let data = [];
        let query = "SELECT * FROM user WHERE full_name = '"+ name +"' ";

        conn.query(query, (err, results, fields) => {
                if (err) throw err;
                
                for (i = 0; i < results.length; i++) {
                    data.push(results[i].email);
                }

                resolve(data);
            });
    
    });
};


module.exports = readData;
