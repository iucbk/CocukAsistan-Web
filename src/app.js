const express = require("express");
const routeManager = require("./config/routeManager");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/", routeManager);
app.listen(8080, () => {
  console.log("Your app is ready at 8080 port.");
});
