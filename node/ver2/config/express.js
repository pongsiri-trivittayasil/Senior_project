var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var exphbs = require('express-handlebars');
var handlebars  = require('../config/helpers')(exphbs);


module.exports = function(){

	var app = express();
	//environment debug
	if (process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}
	//session cookie
	app.use(session({
		secret:'secret_key',
		resave:false,
		saveUninitialized: true
		// cookie: { maxAge: 3600000 }
	}))
	//passport
	app.use(passport.initialize());
	app.use(passport.session());

	//body-parser for req.body
	app.use(bodyParser.urlencoded({
		extended: true,
		limit:'50mb',
		parameterLimit:1000000
	}));
	app.use(bodyParser.json());

	//set path publick
	app.use(express.static('./public'));

	//set path view
	app.set('views','./app/views');

	//set engine
	//app.engine('hbs',hbs({extname:'hbs'}))
	//app.set('view engine','hbs');
	app.engine('hbs', handlebars.engine);
	app.set('view engine', 'hbs');

	//set path routes
	require('../app/routes/index.routes')(app);
	require('../app/routes/handle-database.routes')(app);

	return app;
}