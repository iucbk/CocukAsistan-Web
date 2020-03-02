const router = require('express').Router();


router.get('/example', async (req,res)=>{
    let example = require('../controller/example_cont');

    example.render(req,res);
});


router.get('/register', (req,res)=>{
    
    // code
});


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