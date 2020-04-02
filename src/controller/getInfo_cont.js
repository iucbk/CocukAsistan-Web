const resFun = require('../utils/response_functions');

const SPLIT_KEY = "£z2H`)3FjvXJ(V£/8q!uAV.>l//dn6(";

exports.Info = async (req, res) => {
    let info = req.body.decoded_id;

    let data = info.split(SPLIT_KEY);

    let result = {
        full_name: data[0],
        email: data[1]
    }

    res.json(resFun.success(200, "Success", result));
}