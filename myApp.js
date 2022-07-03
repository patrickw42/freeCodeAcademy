/*
freeCodeCamp Basic Node BackendAPIs Course: SHOWS HOW TO USE EXPRESS TO BUILD HTTP SERVER AND DO
SOME HTTP CRUD METHODS INCLUDING GET(RETURN A RESOURCE), PUT(UPDATE RESOURCE), POST(CREATE NEW RESOURCE),
DELETE (NOT USED), AND USE WHICH MOUNTS OR PUTS THE SPECIFIED MIDDLEWEAR FUNCTIONS AT SPECIFIED PATH.
BESIDES GET AND USE ALL THE OTHERS INCLUDE A PAYLOAD FOUND IN THE req.body.
*/

//so we can access out .env file/variables using "process.env.xxxxx" to access it's property xxxxxx
require("dotenv").config();

//require express and save in app field
const express = require("express");
const app = express();

//Needed for parsing urlencoded post requests. when extended = false object returned doesn't inherit from
//Object class can only be strings or arrays.when extended = true more flexable and data outmatched by json
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//middleware function takes 3 args request result and next function to call. if no next() would infitloop
// middlewear functions must be passed to app.use() with optional first arg as path where it is mounted to
// if no first arg path will mount to root and work for whole app (all routes within)
//this will log the method path and id of each http request that app handles. The req request object has
// a method field which is "GET" "POST" "PUT" etc., a path field holding the location in app and ip
// holding client ip
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//sets the public directory so it can be accessed by anything in the root directory of the app.
// Makes css work when accessed from html file in /views folder (directly as /public/styles.css w/o
// having to back out like ../public/styles   since /views and /public both in root dir / ).
// Notice passing express.static() to an instance of express() saved in app
app.use("/public", express.static(__dirname + "/public"));

//chained middleware can just pass them one after the other to the app.get/use/put method. sets res.time
// as string of current time in first one and responds with object { time: res.time } in 2nd one
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  //2nd middleware function responds with object {time:req.time} that was set in first middleware function
  // notice doesn't have next...might be because it responds with res.send()
  (req, res) => {
    res.send({ time: req.time });
  }
);

//use route params to match the route and return new json obj with {2:3} after path root/2/3 entered in url
// if we want to save to req.params must have a : before it. will save :word after first /, but not echo
// after 2nd backslash /   Will match patterns like ./xxxxx/echo   where xxxx can be anything saved to
//req.params object in .word property. Returned as json string rep using res.json()
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//can also match query string entered by user after "/name"
//if they enter '/name?last=Walker&first=Pat' will return {name: Pat Walker} destucturing using backticks
// and wrapping variables in ${}. The query string variables set in url held in rep.query
app.get("/name", (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

//notice can't do __dirname + '/views/index.html' must do '/views/' + 'index.html'
// also notice ; needed inside the routeHandler since it is a function(return)
// when user clicks on home directory (app opened) will return response res sending the html file to browser
app.get("/", function routeHandler(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});

//NOTICE NEED ; AFTER res.json CALL SINCE IT IS CODE IN A CALLBACK FUNCTION. res.json() responds with
// string representation of json object passed to it. Notice uppercase needs quotes since in .env file
// and isn't declared with const or let. Values stored in .env are stored as strings even though quotes
// not used in their assignment in the .env file
// when user clicks on '/json' within app will return "hello jason" or "HELLO JASON" depending on state
// of MESSAGE_STYLE in the .env file
app.get("/json", function routeHandler(req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase")
    res.json({ message: "HELLO JSON" });
  res.json({ message: "Hello json" });
});

//body-parser allows us to return url encoded values from the form element in index.html (since prop method
//is post and it's action is '/name'). Form values are stored in req.body matching the <input> element's
// name property
app.post("/name", function (req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
