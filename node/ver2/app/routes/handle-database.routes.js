module.exports = function(app){
	var control = require('../controllers/control.controller');
	var tag = require('../controllers/tag.controller');
	var room = require('../controllers/room.controller');
	var ap = require('../controllers/ap.controller');
	var line = require('../controllers/line.controller');

	//control
	app.route('/createcontrol').post(control.create);
	app.route('/editcontrol').post(control.edit);
	app.route('/removecontrol').post(control.remove);
	app.post('/listcontrol',control.list);
	//tag
	app.route('/createtag').post(tag.create);
	app.route('/edittag').post(tag.edit);
	app.route('/removetag').post(tag.remove);
	app.post('/listtag',tag.list);
	//room
	app.route('/createroom').post(room.create);
	app.route('/editroom').post(room.edit);
	app.route('/editroomName').post(room.editName);
	app.route('/editroomInit').post(room.editInit);
	app.route('/removeroom').post(room.remove);
	app.post('/listroom',room.list);
	app.post('/selectroom',room.select);
	//ap
	app.route('/createap').post(ap.create);
	app.route('/editap').post(ap.edit);
	app.route('/removeap').post(ap.remove);
	app.post('/listap',ap.list);
	app.post('/selectap',ap.select);
	//line
	app.route('/createline').post(line.create);
	app.route('/editline').post(line.edit);
	app.route('/removeline').post(line.remove);
	app.post('/listline',line.list);
	app.post('/selectline',line.select);

}