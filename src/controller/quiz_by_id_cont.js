const quizByIdModel = require("../model/quiz_by_id_model");
const resFun = require("../utils/response_functions");

exports.quizById = async (req, res) => {
    let quiz = await quizByIdModel(req.body);
    res.status(200).json(resFun.success(200, "Quiz fetched successfully", quiz));
};
