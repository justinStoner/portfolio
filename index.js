var app=require('express')();
var server=require('http').createServer(app);
var express=require('express');
var compression = require('compression');
var http = require('http')
var port=80;
app.use(compression());
var cacheTime = 86400000*7;
app.use(express.static(__dirname, { maxAge: cacheTime }))


http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
