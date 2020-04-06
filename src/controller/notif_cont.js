const notif_model = require('../model/notif_model');
const resFun = require('../utils/response_functions');


exports.tip = async (req, res) => {
    let unSeenTips = await notif_model.getUnSeenTips(req.body.decoded_id);

    if (unSeenTips.err) {
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }

    let unseen = unSeenTips.results;

    if (unseen.length == 0) {
        res.status(200).json(resFun.success(200, "All tips are seen", null));
        return;
    }

    let index = Math.floor(Math.random() * Math.floor(unseen.length));

    let insertErr = await notif_model.insertSeenTip(req.body.decoded_id, unseen[index].tip_id);
    if(insertErr){
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }

    res.status(200).json(resFun.success(200, "Tip fetch in successfully", unseen[index].tip_content));
}