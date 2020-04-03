const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const loginModel = require("../model/login_model");
const resFun = require("../utils/response_functions");

function comparePassword(password, hash) {
  return new Promise(resolve => {

    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        resolve({
          compare_error: 1
        });
      }

      if (res) {
        resolve({
          is_compare: 1
        });
      }
      else {
        resolve({
          is_compare: 0
        });
      }

    });
  });
}


PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY";

exports.login = async (req, res) => {
  let data = await loginModel(req.body);

  if (data.db_error) {
    res.status(503).json(resFun.fail(503, "Database error"));
    return;
  }

  let result = data.results[0];

  if (result) {
    let compare = await comparePassword(req.body.password, result.password);

    jwt.sign({ id: result.user_id }, PRIVATE_KEY, (err, token) => {
      if (err) {
        res.status(500).json(resFun.fail(500, "An error occured while creating token"))
      };

      if (compare.compare_error)
        res.status(500).json(resFun.fail(500, "An error occured while comparing password"));

      if (compare.is_compare)
        res.status(200).json(resFun.success(200, "Logged in successfully", { email: result.email, full_name: result.full_name, token: token }));
      else
        res.status(422).json(resFun.fail(422, "Incorrect email or password"));
    });
  } else {
    res.status(422).json(resFun.fail(422, "Incorrect email or password"));
  }
};
