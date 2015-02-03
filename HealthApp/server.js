﻿var http = require('http');
var port = process.env.port || 1337;

var express = require('express');
var path = require('path');
var app = express();



//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//app.use("/datas", express.static(__dirname + 'patients/public/data'));
//app.use("/scripts", express.static(__dirname + '/public/javascripts'));
//app.use("/images", express.static(__dirname + '/public/images'));



app.get('/', function (request, response) {
    response.render("index.html");
});



var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
});

