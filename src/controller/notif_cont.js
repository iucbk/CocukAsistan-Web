const notif_model = require('../model/notif_model');
const resFun = require('../utils/response_functions');


exports.tip = async (req, res) => {
    let allTips = await notif_model.getAllTips();
    let seenTips = await notif_model.getSeenTips(req.body.decoded_id);

    if (allTips.err || seenTips.err) {
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }

    let unseen = [], control = false;

    for (let each of allTips.results) {
        for (let item of seenTips.results) {

            if (each.tip_id == item.tip_id) {
                control = true;
                break;
            }
        }

        if (!control)
            unseen.push({tip_id: each.tip_id, tip_content: each.tip_content});

        control = false;
    }

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