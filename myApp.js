console.log("Hello World");
let express = require('express');
let app = express();
let path = require('path');
//notice must join each section of path. can join(__dirname,  /view/index.html)
let abpath = path.join(__dirname, '/views', 'index.html');
console.log(path);
app.get("/", function routeHandler(req,res) { res.sendFile(abpath)});
return path;



































 module.exports = app;
