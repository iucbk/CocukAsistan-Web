const quizesByCategoryModel = require("../model/quizes_by_category_model");
const resFun = require("../utils/response_functions");

exports.quizesByCategory = async (req, res) => {
    let data = await quizesByCategoryModel(req.body.decoded_id, req.body.category_id);
    if(data.dbError){
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }
    res.status(200).json(resFun.success(200, "Quizes fetched successfully", data.quizes));
};
