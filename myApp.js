//must be single quotes which is odd
require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
//const path = require('path');

//middleware function takes 3 args request result and next function to call. if no next() would infitloop
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//chained middleware can just pass them one after the other to the app.get/use/put method. sets res.time
// as string of current time in first one and responds with object { time: res.time } in 2nd one
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  //2nd middleware function responds with object {time:req.time} that was set in first middleware function
  // notice doesn't have next...
  (req, res) => {
    res.send({ time: req.time });
  }
);

//use route params to match the route and return new json obj with {2:3} after path root/2/3 entered in url
app.get("/:word/echo"), (req, res) => { res.json({ echo: word }) });

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
