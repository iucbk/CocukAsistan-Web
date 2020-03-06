const bcrypt = require('bcryptjs');
const registerModel = require('../model/register_model');
const resFun = require("../utils/response_functions");


function hashPassword(password){
    return new Promise(resolve => {

        bcrypt.hash(password, 10, (err, hash) => {
            let hash_error = 0;

            if(err) hash_error = 1;

            resolve({
                hash: hash,
                error: hash_error
            });
        });
    });
}



exports.register = async (req,res) => {

    let hash_data = await hashPassword(req.body.password);
    let hash_error = hash_data.error;
    let hash = hash_data.hash;

    let insertErr;

    if(!hash_error) 
        insertErr = await registerModel(req.body, hash);
    else{
        res.status(500).json(resFun.fail(500, "An error occured while hashing password"));
        return;
    }

    

    if(!insertErr) res.status(200).json(resFun.success(200, "Registered in successfully", null));

    else res.status(200).json(resFun.fail(503, "An error occured while inserting user"));

};

