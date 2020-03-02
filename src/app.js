const express = require('express');
const routeManager = require('./config/routeManager');

const app = express();


app.use('/', routeManager);


app.listen(8080, ()=>{
    console.log("Your app is ready at 8080 port.");
});