const express = require("express");
const bodyParser = require("body-parser");

const routeManager = require("./config/routeManager");
const verifyAuth = require("./middleware/verify_auth");
const conn = require("./config/db");

global.conn = conn;
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(verifyAuth);

app.use("/", routeManager);

app.listen(PORT, () => {
  console.log("Your app is ready at " + PORT + " port.");
});
