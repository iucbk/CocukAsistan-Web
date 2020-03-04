const registerModel = require('../model/register_model');

exports.register = async (req,res) => {
    
    let data = await registerModel(req.body);
    data.code = res.statusCode;

    res.status(200).json(data);
};