const quiz_model = require("../model/quiz_model");
const resFun = require("../utils/response_functions");


exports.quizById = async (req, res) => {
    let quiz = await quiz_model.getQuizById(req.query.quiz_id);
    res.status(200).json(resFun.success(200, "Quiz fetched successfully", quiz));
};

exports.quizCategories = async (req, res) => {
    let categories = await quiz_model.getQuizCategories();
    res.status(200).json(resFun.success(200, "Categories fetched successfully", categories));
};
