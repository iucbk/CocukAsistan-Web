const mysql = require('mysql');
const config = require('../config/db');


exports.seenTips = (user_id) => {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let selQuery = `SELECT * FROM tip WHERE tip_id NOT IN 
            (SELECT tip_id FROM seentip WHERE user_id = ?) LIMIT 1`;

        let insQuery = `INSERT INTO seentip (user_id, tip_id) VALUES (?, ?)`;

        conn.query(selQuery, [user_id], (err1, results) => {
            if (err1 || results.length == 0) {
                conn.end(err2 => {
                    
                    resolve({ results: null, err: err1 || err2 });
                })
            }
            else {
                conn.query(insQuery, [user_id, results[0].tip_id], (err) => {
                    let db_err = 0;
                    if (err) db_err = 1;

                    conn.end(err => {
                        if (err) db_err = 1;

                        resolve({ results: results[0].tip_content, err: db_err });
                    })
                })
            }

        })
    })
}
