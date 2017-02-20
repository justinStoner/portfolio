var app=require('express')();
var server=require('http').createServer(app);
var express=require('express');
var compression = require('compression');

app.use(compression());

app.use(express.static(__dirname))

app.listen(5000);
