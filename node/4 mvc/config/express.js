var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var validator = require('express-validator');
//var cookieSession = require('cookie-session');
var session = require('express-session');

module.exports = function(){
	var app = express();
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else {
		app.use(compression);
	}
/* cookie-session
	app.use(cookieSession({
		name: 'session',
		keys: ['secret_key1','secret_key2']
	}));
*/
	app.use(session({
		secret: 'secret_key',
		resave:false,
		saveUninitialized:true
	}));
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(validator()); //next bodyparser immediately


	app.set('views','./app/views');
	app.set('view engine','pug');

	require('../app/routes/index.routes')(app);
	require('../app/routes/user.routes')(app);

	app.use(express.static('./public'));
	return app;
};