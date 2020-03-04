const router = require('express').Router();
const registerController = require('../controller/register_cont');


router.get('/example', async (req,res)=>{
    let example = require('../controller/example_cont');

    example.render(req,res);
});


router.post('/register', registerController.register);


router.get('/login', (req,res)=>{
    
    // code
});


router.get('/newquiz', (req,res)=>{
    
    // code
});


router.get('/finishedquizzes', (req,res)=>{
    
    // code
});


module.exports = router;