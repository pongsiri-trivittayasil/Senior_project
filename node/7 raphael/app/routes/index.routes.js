module.exports = function(app){
	var index = require('../controllers/index.controller');
	var control = require('../controllers/control.controller');
	app.get('/',index.render);
	app.get('/page_data',index.page_data);
	app.get('/back',index.render);
	app.route('/create').post(control.list).get(index.page_data);
}