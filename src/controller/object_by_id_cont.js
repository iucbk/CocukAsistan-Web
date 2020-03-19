const objectByIdModel = require("../model/object_by_id_model");
const resFun = require("../utils/response_functions");

exports.objectById = async (req, res) => {
  let object = await objectByIdModel(req.body.object_id);
  res
    .status(200)
    .json(resFun.success(200, "Object fetched successfully", object));
};
