const express = require('express');

const app = express();


app.get('/', (req,res)=>{
    res.write("<h1> Your APP! </h1>");
    res.end();

    require('./model/select');
});


app.listen(8080, ()=>{
    console.log("Your app is ready at 8080 port.");
});