const quizesByCategoryModel = require("../model/quizes_by_category_model");
const resFun = require("../utils/response_functions");

exports.quizesByCategory = async (req, res) => {
    let quizes = await quizesByCategoryModel(req.body.decoded_id, req.body.category_id);
    res.status(200).json(resFun.success(200, "Quizes fetched successfully", quizes));
};
