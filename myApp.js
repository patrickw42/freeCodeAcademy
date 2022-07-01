require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
//const path = require('path');
app.use("/public", express.static(__dirname + "/public"));

//notice can't do __dirname + '/views/index.html' must do '/views/' + 'index.html'
// also notice ; needed insinde the routeHandler since it is a function(return)
app.get("/", function routeHandler(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});

//NOTICE NEED ; AFTER res.json CALL SINCE IT IS CODE IN A CALLBACK FUNCTION
//app.get("/json", function routeHandler(req, res) {
// if (process.env.MESSAGE_STYLE === "uppercase")
//   res.json({ message: "HELLO JSON" });
// else
//    res.json({ message: "Hello json" });
//});

module.exports = app;
