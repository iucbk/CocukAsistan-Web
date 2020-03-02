const conn = require('../config/init');


function readData(){
    
    return new Promise(resolve => {
        let data = [];

        conn.query('SELECT * FROM user', (err, results, fields) => {
                if (err) throw err;
                
                for (i = 0; i < results.length; i++) {
                    data.push(results[i].email);
                }
            });
    
       conn.end(()=>{
            resolve(data);
       });

    });
};


module.exports = readData();
