const bcrypt = require('bcryptjs');
const updatePasswordModel = require('../model/updatePassword_model');
const resFun = require("../utils/response_functions");


function hashPassword(password) {
    return new Promise(resolve => {

        bcrypt.hash(password, 10, (err, hash) => {
            let hash_error = 0;

            if (err) hash_error = 1;

            resolve({
                hash: hash,
                error: hash_error
            });
        });
    });
}



exports.update = async (req, res) => {

    let hash_data = await hashPassword(req.body.new_password);
    let hash_error = hash_data.error;
    let hash = hash_data.hash;

    let db_error;

    if (!hash_error)
        db_error = await updatePasswordModel(req.body, hash);
    else {
        res.status(500).json(resFun.fail(500, "An error occured while hashing password"));
        return;
    }


    if (!db_error) res.status(200).json(resFun.success(200, "Updated password in successfully", null));

    else res.status(503).json(resFun.fail(503, "Database error"));

};
