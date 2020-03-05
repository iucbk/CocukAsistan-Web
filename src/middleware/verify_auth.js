const jwt = require("jsonwebtoken");
const resFun = require("../utils/response_functions");

// TODO: bu parametrler ayrı bie config dosyasına aktarılmalı
PUBLIC_ROUTES = ["/login", "/signup"];
PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY";

function verifyAuth(req, res, next) {
    if (PUBLIC_ROUTES.includes(req.path)) {
        next();
    } else {
        jwt.verify(req.headers.token, PRIVATE_KEY, function (err, decoded) {
            if (err) {
                res.status(422).json(resFun.fail(422, "Invalid token"));
            } else {
                req.body.decoded_id = decoded.id;
                next();
            }
        })
    }
};

module.exports = verifyAuth;