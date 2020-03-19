const objectByIdModel = require("../model/object_by_id_model");
const resFun = require("../utils/response_functions");

exports.objectById = async (req, res) => {
    let object = await objectByIdModel(req.body.object_id);

    if (object.db_error) {
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }

    res.status(200).json(resFun.success(200, "Object fetched successfully", object.results));
};
