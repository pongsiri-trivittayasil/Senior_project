module.exports = function(app){
	var index = require('../controllers/index.controller');
	var control = require('../controllers/control.controller');
	var tag = require('../controllers/tag.controller');
	var room = require('../controllers/room.controller');
	var ap = require('../controllers/ap.controller');

	//page
	app.get('/',index.render);
	app.get('/page_data',index.page_data);
	app.get('/back',index.render);
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
	app.route('/removeroom').post(room.remove);
	app.post('/listroom',room.list);
	//ap
	app.route('/createap').post(ap.create);
	app.route('/editap').post(ap.edit);
	app.route('/removeap').post(ap.remove);
	app.post('/listap',ap.list);

}