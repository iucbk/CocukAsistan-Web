const notif_model = require('../model/notif_model');
const resFun = require('../utils/response_functions');


exports.tip = async (req, res) => {
    let seenTips = await notif_model.seenTips(req.body.decoded_id);

    if (seenTips.err) {
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }

    let results = seenTips.results;

    if (!results) {
        res.status(200).json(resFun.success(200, "All tips are seen", null));
        return;
    }

    res.status(200).json(resFun.success(200, "Tip fetch in successfully", results));
}