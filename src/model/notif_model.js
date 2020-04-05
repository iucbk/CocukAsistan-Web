const mysql = require('mysql');
const config = require('../config/db');


exports.getAllTips = () => {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = "SELECT * FROM tip";

        conn.query(query, (err, results) => {
            let db_err = 0;

            if (err) db_err = 1;

            conn.end(err => {
                if (err) db_err = 1;

                resolve({ results: results, err: db_err });
            })
        })
    })
}

exports.getSeenTips = (user_id) => {
    return new Promise(resolve => {

        const conn = new mysql.createConnection(config);
        let query = "SELECT * FROM seentip WHERE user_id = ?";

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