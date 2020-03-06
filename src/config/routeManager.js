const router = require('express').Router();
const loginController = require('../controller/login_cont');
const quizCategories = require('../controller/quiz_categories_cont');
const verifyAuth = require('../middleware/verify_auth');
const mysql = require('mysql');


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

router.post('/quizes/search', verifyAuth,  async (req, res)=>{
    //connection yarat
    const connection = mysql.createConnection({
        host: 'cocukasistanmysql.mysql.database.azure.com',
        user: 'asistan@cocukasistanmysql',
        password: 'iucbkCocuk2020',
        database: 'cocukasistan',
        port: 3306
    });
    //req.category_id yi kullanarak databasede arama yap
    const q = "SELECT quiz_title FROM Quiz WHERE category_id='";
    try{
        connection.query(q+req.body.category_id+"';", (error, results)=>{
            if(error){
                res.status(400).json({err:error});
            } else {
//Response olarak ise databaseden quiz_title verilerini gönder.
                res.status(200).json({results:results});
            }
        });
    } catch (err){
        console.log(err);
        res.status(500).send({err:err});
    }
});
module.exports = router;