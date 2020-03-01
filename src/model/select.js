const conn = require('./init');


function readData(){
    conn.query('SELECT * FROM user', (err, results, fields) => {
            if (err) throw err;
            
            for (i = 0; i < results.length; i++) {
                console.log(results[i].email);
            }
        });

   conn.end();
};

readData();
