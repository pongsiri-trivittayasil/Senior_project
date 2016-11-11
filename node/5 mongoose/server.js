//how set env = set NODE_ENV=production,development

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/* test db
var mongoose = require('mongoose');
var url = 'mongodb://localhost/5';
var db = mongoose.connect(url);
*/
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;

console.log('server running')

