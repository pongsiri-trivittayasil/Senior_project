var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
//var hbs = require('express-handlebars');
//require('../config/helpers')(hbs);
var exphbs = require('express-handlebars');
var handlebars  = require('../config/helpers')(exphbs);


module.exports = function(){

	var app = express();

	if (process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}
	app.use(bodyParser.urlencoded({
		extended: true
	}))

	app.use(express.static('./public'));


	app.set('views','./app/views');
	//app.engine('hbs',hbs({extname:'hbs'}))
	//app.set('view engine','hbs');
	app.engine('hbs', handlebars.engine);
	app.set('view engine', 'hbs');

	require('../app/routes/index.routes')(app);


	return app;
}