module.exports = function(app){
	var index = require('../controllers/index.controller');
	var choose_map = require('../controllers/choose-map.controller');
	var map = require('../controllers/map.controller');
	var page_data = require('../controllers/page-data.controller');
	var deletemap = require('../controllers/deletemap.controller');
	var rule = require('../controllers/rule.controller');
	var history = require('../controllers/history.controller');
	var user = require('../controllers/user.controller');
	var fs = require('../controllers/file.controller');
	var passport = require('passport');


	//-------------------------Default home--------------------------------
	app.get('/',index.render_home);

	//-------------------------Map---------------------------------------
	app.route('/map').get(map.render_map).post(map.render_map);

	//-------------------------Choose Map----------------------------------
	app.get('/choose_map',choose_map.render_choose_map);

	//-------------------------Page Data----------------------------------
	app.get('/page_data',page_data.render_page_data);
	app.get('/back',map.render_map);

	//-------------------------Rule---------------------------------------
	app.get('/page_rule',rule.render_rule);
	//-------------------------History---------------------------------------
	app.get('/page_history',history.render_history);
	app.post('/tag_history',history.list_history);

	//-------------------------User---------------------------------------
	app.route('/signup').get(user.rendersignup).post(user.signup);
	// app.route('/login').get(user.renderlogin)
	// 	.post(passport.authenticate('local',{
	// 		successRedirect:'/',
	// 		failureRedirect: '/login'
	// 	}));
	app.post('/login', function(req, res, next) {
	    passport.authenticate('local', function(error, user, info) {
	        if(error) {
	            return res.status(500).json(error);
	        }
	        if(!user) {
	            return res.send("error");
	        }
	        req.logIn(user, function(err) {
	            if (err) { return next(err); }
	    	});
		    res.json("refresh");
	    })(req, res, next);
	});
	app.route('/logout').get(user.logout).post(user.logout);

	//-------------------------file---------------------------------------
	//file
	app.post('/savefile',fs.save);
	//-------------------------create Map----------------------------------
	app.post('/savemap',fs.savemap);
	//-------------------------Delete Map----------------------------------
	app.get('/deletemap',deletemap.deletemap);
	//-------------------------test---------------------------------------
	app.post('/test',index.test);

}