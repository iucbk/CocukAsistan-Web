const router = require('express').Router();
const loginController = require('../controller/login_cont');
const quizCategories = require('../controller/quiz_categories_cont');


router.get('/example', async (req, res) => {
    let example = require('../controller/example_cont');

    example.render(req, res);
});


router.get('/register', (req, res) => {

    // code
});


router.post('/login', loginController.login);

router.get('/getQuizCategories', quizCategories.quizCategories);


router.get('/newquiz', (req, res) => {

    // code
});


router.get('/finishedquizzes', (req, res) => {

    // code
});


module.exports = router;