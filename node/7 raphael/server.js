process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose(); //return mongoose.connect()
var app = express();
app.listen(3000);
module.exports = app;

console.log('server running');