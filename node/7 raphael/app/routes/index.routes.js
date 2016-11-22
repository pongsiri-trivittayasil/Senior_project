module.exports = function(app){
	var index = require('../controllers/index.controller');
	var control = require('../controllers/control.controller');
	app.get('/',index.render);
	app.get('/page_data',index.page_data);
	app.get('/back',index.render);
	app.route('/createcontrol').post(control.create);
	app.route('/editcontrol').post(control.edit);
	app.route('/removecontrol').post(control.remove);
	app.route('/editap').post(control.list);
}