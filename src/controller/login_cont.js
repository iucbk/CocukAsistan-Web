const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const loginModel = require("../model/login_model");
const resFun = require("../utils/response_functions");

function comparePassword(password, hash){
    return new Promise(resolve => {

        bcrypt.compare(password, hash, (err, res) => {
            let compare_error = 0;
            let is_compare = 0;
            
            if(err){
                compare_error = 1;
                resolve({
                    compare_error: compare_error
                });
                return;
            }

            if(res) {
                is_compare = 1;
                resolve({
                    is_compare: is_compare
                });
            } 
            else {
                isCompare = 0;
                resolve({
                    is_compare: is_compare
                });
            } 
            
          });
    });
}


PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY";

exports.login = async (req, res) => {
    let data = await loginModel(req.body);
    let compare = await comparePassword(req.body.password, data[0].password);
    
    if (data.length == 1) {
        jwt.sign({ id: data[0].user_id }, PRIVATE_KEY, function (err, token) {
            if (err) {
                res.status(500).json(resFun.fail(500, "An error occured while creating token"))
            };

            if(compare.compare_error) 
                res.status(500).json(resFun.fail(500, "An error occured while comparing password"));

            if(compare.is_compare)
                res.status(200).json(resFun.success(200, "Logged in successfully", { token: token }));
            else
                res.status(422).json(resFun.fail(422, "Password did not match"));

        });
    } else {
        res.status(422).json(resFun.fail(422, "Incorrect email or password"));
    }
};
