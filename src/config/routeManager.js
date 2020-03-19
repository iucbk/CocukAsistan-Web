const router = require("express").Router();
const loginController = require("../controller/login_cont");
const registerController = require("../controller/register_cont");
const updatePasswordController = require("../controller/updatePassword_cont");
const quiz_cont = require("../controller/quiz_cont");
const objectById = require("../controller/object_by_id_cont");

router.get("/favicon.ico", (req, res) => res.status(204).json({}));

// user router
router.post("/user/signup", registerController.mail);

router.get("/user/verify", registerController.register);

router.post("/user/login", loginController.login);

router.post("/user/updatePassword", updatePasswordController.update);

// quiz router
router.get("/quiz/getById", quiz_cont.quizById);

router.get("/quiz/getCategories", quiz_cont.quizCategories);

router.get("/quiz/getByCategory", quiz_cont.quizesByCategory);

// object router
router.get("/object/getById", objectById.objectById);


module.exports = router;
