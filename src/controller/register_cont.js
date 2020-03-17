const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const registerModel = require('../model/register_model');
const resFun = require("../utils/response_functions");


const PRIVATE_KEY = "COCUK_ASISTAN_2020_PRIVATE_KEY_SEND&MAIL";
const SPLIT_KEY = "£z2H`)3FjvXJ(V£/8q!uAV.>l//dn6(";
const MAIL_KEY = "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";

// Sending Verification Mail

function sendMail(req, token){
    return new Promise(resolve => {
        
        sgMail.setApiKey(MAIL_KEY);

        const msg = {
            to: req.body.email,
            from: 'cocukasistan.iucbk@gmail.com',
            subject: 'Çocuk Asistan Hesap Aktivasyonu',
            text: 'Sayın ' + req.body.full_name + ', hesabınızı aktive edin.\n' + 
                req.protocol + "://" + req.headers.host + "/user/verify?confirmation=" + token
        };
    
        sgMail.send(msg, (err, result) => {
            if(err) 
                resolve({send_error: 1});

            resolve({send_error: 0});
          
        });
    });
}


exports.mail = async (req,res) => {
    
    // Is there user in db?
    let data = await registerModel.isThereUser(req.body.email);
    if(data.selectErr){
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }else{
        if(data.results.length != 0){
            res.status(500).json(resFun.fail(500, "User is exist"));
            return;
        }
    }

    // Sending mail
    let url = req.body.full_name + SPLIT_KEY + req.body.email + SPLIT_KEY + req.body.password; 

    jwt.sign({ url: url }, PRIVATE_KEY, async (err, token) => {
        if (err) {
            res.status(500).json(resFun.fail(500, "An error occured while creating token"));
        }
            
        let result = await sendMail(req, token);
        
        if(result.send_error)
            res.status(500).json(resFun.fail(500, "An error occured while sending mail"));


        res.status(200).json(resFun.success(200, "The mail was sent in successfully", null));
    });

}



// Inserting User in DB

function hashPassword(password){
    return new Promise(resolve => {

        bcrypt.hash(password, 10, (err, hash) => {
            let hash_error = 0;

            if(err) hash_error = 1;

            resolve({
                hash: hash,
                error: hash_error
            });
        });
    });
}


exports.register = async (req,res) => {
    
    // JWT
    let full_name, email, password, jwtErr = 0;

    jwt.verify(req.query.confirmation, PRIVATE_KEY, (err, decoded) => {
        if (err) jwtErr = 1;
            
        else {
            let url = decoded.url.split(SPLIT_KEY);
            if(url.length != 3) return jwtErr = 1;

            full_name = url[0];
            email = url[1];
            password = url[2];
        }
    });

    if(jwtErr){
        res.status(422).json(resFun.fail(422, "Invalid token"));
        return;
    }


    // Is there user in db?
    let data = await registerModel.isThereUser(email);
    if(data.selectErr){
        res.status(503).json(resFun.fail(503, "Database error"));
        return;
    }else{
        if(data.results.length != 0){
            res.status(500).json(resFun.fail(500, "User is exist"));
            return;
        }
    }

    // Hashing and registration
    let hash_data = await hashPassword(password);
    let hash_error = hash_data.error;
    let hash = hash_data.hash;

    let insertErr;

    if(!hash_error) 
        insertErr = await registerModel.register(full_name, email, hash);
    else{
        res.status(500).json(resFun.fail(500, "An error occured while hashing password"));
        return;
    }
    
    if(!insertErr) res.status(200).json(resFun.success(200, "Registered in successfully", null));

    else res.status(503).json(resFun.fail(503, "Database error"));

};

