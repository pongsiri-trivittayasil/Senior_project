var mongoose = require('mongoose');
var uri = 'mongodb://localhost/my-project';
module.exports = function(){
	//mongoose.set('debug',true);
	var db = mongoose.connect(uri);

	require('../app/models/control.model');

	return db;
}