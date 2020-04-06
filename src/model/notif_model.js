const mysql = require('mysql');
const config = require('../config/db');


exports.getUnSeenTips = (user_id) => {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = `SELECT * FROM tip WHERE tip_id NOT IN 
        (SELECT tip_id FROM seentip WHERE user_id = ?) `;

        conn.query(query, [user_id], (err, results) => {
            let db_err = 0;

            if (err) db_err = 1;

            conn.end(err => {
                if (err) db_err = 1;

                resolve({ results: results, err: db_err });
            })
        })
    })
}

exports.insertSeenTip = (user_id, tip_id) => {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = "INSERT seentip (user_id, tip_id) VALUES (?, ?)";

        conn.query(query, [user_id, tip_id], (err, results) => {
            let db_err = 0;

            if (err) db_err = 1;

            conn.end(err => {
                if (err) db_err = 1;

                resolve(db_err);
            })
        })
    })
}