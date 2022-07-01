console.log("Hello World");
let express = require('express');
let app = express();
let abPath = __dirname + /views/index.html;
app.get("/", function routeHandler(req,res) { res.send(abPath)});




































 module.exports = app;
