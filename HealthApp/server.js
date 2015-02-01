var http = require('http');
var port = process.env.port || 1337;
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);



var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
    response.sendfile("index.html");
});

app.listen(port);