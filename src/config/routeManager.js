const router = require('express').Router();


router.get('/example', async (req,res)=>{
    let example = require('../controller/example_ctrl');

    example.render(req,res);
});


router.get('/register', (req,res)=>{
    res.write("<h1>Register</h1>");
    res.end();
});


router.get('/login', (req,res)=>{
    res.write("<h1>Login</h1>");
    res.end();
});


router.get('/newquiz', (req,res)=>{
    res.write("<h1>New Quiz</h1>");
    res.end();
});


router.get('/finishedquizzes', (req,res)=>{
    res.write("<h1>Finished Quizzes</h1>");
    res.end();
});


module.exports = router;