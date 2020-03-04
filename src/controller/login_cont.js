const loginModel = require("../model/login_model");
const jwt = require("jsonwebtoken");
const resFun = require("../utils/response_functions");

PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY";

exports.login = async (req, res) => {
  let data = await loginModel(req.body);
  if (data.length == 1) {
    jwt.sign({ id: data[0].user_id }, PRIVATE_KEY, function(err, token) {
      if (err) throw err;
      res.status(200).json(resFun.success(200, "Logged in successfully", {token: token}));
    });
  } else {
    console.log(data);
    res.status(200).json(resFun.fail(422, "Incorrect email or password"));
  }
};
