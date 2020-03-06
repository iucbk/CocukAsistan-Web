const registerModel = require('../model/register_model');
const resFun = require("../utils/response_functions");

exports.register = async (req,res) => {
    
    let message = await registerModel(req.body);

    if(message) res.status(200).json(resFun.success(200, "Registered in successfully", null));

    else res.status(200).json(resFun.success(503, "An error occured while inserting user", null));

};