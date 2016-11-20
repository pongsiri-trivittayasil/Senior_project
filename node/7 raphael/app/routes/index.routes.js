module.exports = function(app){
	var index = require('../controllers/index.controller');
	var control = require('../controllers/control.controller');
	app.get('/',index.render);
	app.post('/test',index.setting);
	app.post('/back',index.render);
	app.route('/create').post(control.create);
}