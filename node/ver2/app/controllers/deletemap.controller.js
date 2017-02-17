var control = require('../controllers/control.controller');
var Tag = require('../controllers/tag.controller');
var Room = require('../controllers/room.controller');
var AP = require('../controllers/ap.controller');
var Line = require('../controllers/line.controller');
var Rule = require('../controllers/rule-create.controller');
var maps = require('../controllers/map.controller');
var file = require('../controllers/file.controller');

exports.deletemap = function(req,res){
	// console.log(req.body);
	// console.log(req.user.Username);
	// console.log(req.session.map);
	var user = req.user.Username;
	var map = req.session.map;
	console.log(user,map);
	// delete db
	control.removelist(user,map);
	Tag.removelist(user,map);
	Room.removelist(user,map);
	AP.removelist(user,map);
	Line.removelist(user,map);
	// delete rule
	Rule.removelist(user,map);
	// map
	maps.removelist(user,map);
	file.removelist(user,map);

	res.send('success');
}

var deletemap = function(){
	var user = "admin";
	var map = "test";
	console.log(user,map);
	// delete db
	control.removelist(user,map);
	Tag.removelist(user,map);
	Room.removelist(user,map);
	AP.removelist(user,map);
	Line.removelist(user,map);
	// delete rule
	Rule.removelist(user,map);
	// map
	maps.removelist(user,map);
	file.removelist(user,map);
}

// deletemap();

