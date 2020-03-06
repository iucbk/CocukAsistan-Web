const quizCategoriesModel = require("../model/quiz_categories_model");
const resFun = require("../utils/response_functions");

exports.quizCategories = async (req, res) => {
    let categories = await quizCategoriesModel();
    res.status(200).json(resFun.success(200, "Categories fetched successfully", categories));
};
