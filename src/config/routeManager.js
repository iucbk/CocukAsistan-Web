const router = require('express').Router();
const loginController = require('../controller/login_cont');
const registerController = require('../controller/register_cont');
const quizCategories = require('../controller/quiz_categories_cont');
const quizById = require("../controller/quiz_by_id_cont");
const objectById = require('../controller/object_by_id_cont');

router.get('/example', async (req, res) => {
    let example = require('../controller/example_cont');

    example.render(req, res);
});


// user router
router.post('/user/signup', registerController.register);

router.post("/user/login", loginController.login);


// quiz router
router.get("/quiz/getCategories", quizCategories.quizCategories);

router.get("/quiz/getById", quizById.quizById);


// object router
router.get('/object/getById', objectById.objectById);

router.get("/newquiz", (req, res) => {
  // code
});

router.get("/finishedquizzes", (req, res) => {
  // code
});

module.exports = router;