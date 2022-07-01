//console.log("Hello World");
let express = require('express');
let app = express();
let path = require('path');
//notice can't do __dirname + '/views/index.html' must do '/views/' + 'index.html'
app.get("/", function routeHandler(req,res) { res.sendFile(__dirname + '/views/' + 'index.html')});




































 module.exports = app;
