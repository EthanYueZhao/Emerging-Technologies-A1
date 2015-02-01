var http = require('http');
var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);



var express = require('express');
var path = require('path');
var app = express();



//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//app.use("/datas", express.static(__dirname + 'patients/public/data'));
//app.use("/scripts", express.static(__dirname + '/public/javascripts'));
//app.use("/images", express.static(__dirname + '/public/images'));



app.get('/', function (request, response) {
    response.sendfile("index.html");
});

app.listen(port);