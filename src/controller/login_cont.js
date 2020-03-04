const loginModel = require("../model/login_model");
var jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  let data = await loginModel(req.body);
  if (data.length == 1) {
    res.status(200).json({
      code: 200,
      message: "Logged in successfully"
    });
  } else {
    console.log(data);
    res.status(200).json({
      code: 422,
      message: "Incorrect email or password"
    });
  }
};
