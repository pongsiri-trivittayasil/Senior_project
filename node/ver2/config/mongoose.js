var mongoose = require('mongoose');
var uri = 'mongodb://seniorpj:123456@128.199.119.31/my-project?authSource=admin';
// var uri = 'mongodb://128.199.119.31/my-project';
// var uri = 'mongodb://localhost/my-project';

module.exports = function(){
	// mongoose.set('debug',true);
	var db = mongoose.connect(uri);
	// var db = mongoose.createConnection(uri,{auth:{authdb:"admin"}});

	require('../app/models/user.model');
	require('../app/models/map.model');
	require('../app/models/data.model');
	require('../app/models/rule.model');
	require('../app/models/history.model');

	return db;
}