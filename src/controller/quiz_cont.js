const quiz_model = require("../model/quiz_model");
const resFun = require("../utils/response_functions");

exports.quizById = async (req, res) => {
  let quiz = await quiz_model.getQuizById(req.query.quiz_id);
  res.status(200).json(resFun.success(200, "Quiz fetched successfully", quiz));
};

exports.quizCategories = async (req, res) => {
  let categories = await quiz_model.getQuizCategories();
  res
    .status(200)
    .json(resFun.success(200, "Categories fetched successfully", categories));
};

exports.quizesByCategory = async (req, res) => {
  let data = await quiz_model.getQuizesByCategory(
    req.body.decoded_id,
    req.query.category_id
  );
  if (data.dbError) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }
  res
    .status(200)
    .json(resFun.success(200, "Quizes fetched successfully", data.quizes));
};
