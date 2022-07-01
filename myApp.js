console.log("Hello World");
let express = require('express');
let app = express();
app.get("/", function routeHandler(req,res) { res.sendFile(path.join(__dirname, 'views/index.html'))});




































 module.exports = app;
