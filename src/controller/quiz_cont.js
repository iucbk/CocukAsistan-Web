const quiz_model = require("../model/quiz_model");
const resFun = require("../utils/response_functions");

exports.quizById = async (req, res) => {
  let quiz = await quiz_model.getQuizById(req.query.quiz_id);

  if (quiz.db_error) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }

  let data = [];

  quiz.results.forEach(element => {
    let add = {
      quiz_id: element.quiz_id,
      quiz_title: element.quiz_title,
      questions: {
        question_content: element.question_content,
        true_option: element.true_option,
        options: element.options.split("\\n")
      }
    }
    
    data.push(add);
  });

  res.status(200).json(resFun.success(200, "Quiz fetched successfully", data[0]));
};


exports.quizCategories = async (req, res) => {
  let categories = await quiz_model.getCategories();
  let byId = await quiz_model.getCategoriesById(req.body.decoded_id);

  if (categories.db_error || byId.db_error) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }


  let catResult = [];
  for (let each of categories.results) {

    if (catResult[each.category_id - 1])
      catResult[each.category_id - 1].push({ id: each.category_id, name: each.category_name })
    else
      catResult[each.category_id - 1] = [{ id: each.category_id, name: each.category_name }];
  }

  let idResult = [];
  for (let each of byId.results) {

    if (idResult[each.category_id - 1])
      idResult[each.category_id - 1] += 1;
    else
      idResult[each.category_id - 1] = 1;
  }

  let dataResult = []
  for (let i = 0; i < catResult.length; i++) {

    if (catResult[i].length == idResult[i])
      dataResult.push({ id: catResult[i][0].id, name: catResult[i][0].name, isAllSolved: 1 });
    else
      dataResult.push({ id: catResult[i][0].id, name: catResult[i][0].name, isAllSolved: 0 });

  }

  res.status(200).json(resFun.success(200, "Categories fetched successfully", dataResult));
};


exports.quizesByCategory = async (req, res) => {
  let data = await quiz_model.getQuizesByCategory(
    req.body.decoded_id,
    req.query.category_id
  );
  if (data.db_error) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }
  res
    .status(200)
    .json(resFun.success(200, "Quizes fetched successfully", data.results));
};


exports.solvedQuiz = async (req, res) => {
  let select = await quiz_model.isThereSolvedQuiz(req.body.decoded_id, req.body.quiz_id)
  
  if (select.err) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }
  
  let insert_update_err = await quiz_model.solvedQuiz(select.result, req.body.decoded_id, req.body.quiz_id, req.body.quiz_score);
  
  if (insert_update_err) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }

  res.status(200).json(resFun.success(200, "Quiz sent successfully", null));
};
