var mongoose = require('mongoose');
var uri = 'mongodb://128.199.119.31/my-project';
// var uri = 'mongodb://localhost/my-project';

module.exports = function(){
	mongoose.set('debug',true);
	var db = mongoose.connect(uri);

	require('../app/models/main.model');

	return db;
}