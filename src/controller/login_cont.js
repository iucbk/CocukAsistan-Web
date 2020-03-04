const loginModel = require("../model/login_model");
var jwt = require("jsonwebtoken");

PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY";

exports.login = async (req, res) => {
  let data = await loginModel(req.body);
  if (data.length == 1) {
    jwt.sign({ id: data[0].user_id }, PRIVATE_KEY, function(err, token) {
      if (err) throw err;
      res.status(200).json({
        code: 200,
        message: "Logged in successfully",
        data: { token: token }
      });
    });
  } else {
    console.log(data);
    res.status(200).json({
      code: 422,
      message: "Incorrect email or password"
    });
  }
};
