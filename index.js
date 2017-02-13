var app=require('express')();
var server=require('http').createServer(app);
var express=require('express');
app.use(express.static(__dirname))

app.listen(80);
