console.log("Hello World");
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + "/public"));

//notice can't do __dirname + '/views/index.html' must do '/views/' + 'index.html'
app.get("/", function routeHandler(req,res) { res.sendFile(__dirname + '/views/' + 'index.html')});

//app.get("/json", function routeHandler(req, res) {
//    res.json({message : "Hello json"});
//} )



































 module.exports = app;
