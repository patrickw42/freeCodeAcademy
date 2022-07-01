console.log("Hello World");
let express = require('express');
let app = express();
app.get("/", function routeHandler(req,res) { res.sendFile(./views/index.html)});




































 module.exports = app;
