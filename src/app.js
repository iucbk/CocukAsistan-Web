const express = require("express");
const bodyParser = require("body-parser");

const routeManager = require("./config/routeManager");
const verifyAuth = require("./middleware/verify_auth");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(verifyAuth);

app.use("/", routeManager);

app.listen(8080, () => {
  console.log("Your app is ready at 8080 port.");
});
