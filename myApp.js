//must be single quotes which is odd
require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
//const path = require('path');

//middleware function takes 3 args request result and next function to call. if no next() would infitloop
app.use("/", (req, res, next) => {
  console.log(req.method, " ", req.path, " - ", req.ip);
  next();
});

//sets the public directory so we can access with relative path
app.use("/public", express.static(__dirname + "/public"));

//notice can't do __dirname + '/views/index.html' must do '/views/' + 'index.html'
// also notice ; needed insinde the routeHandler since it is a function(return)
// when user clicks on home directory (app opened) will return response res sending the html file to browser
app.get("/", function routeHandler(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});

//NOTICE NEED ; AFTER res.json CALL SINCE IT IS CODE IN A CALLBACK FUNCTION
app.get("/json", function routeHandler(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase")
    res.json({ message: "HELLO JSON" });
  res.json({ message: "Hello json" });
});

module.exports = app;
