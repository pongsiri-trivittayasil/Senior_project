var express = require('express');


module.exports = function(){
	var app = express();

	app.use(express.static('./public'));

	app.set('views','./app/views');
	app.set('view engine','hbs');

	require('../app/routes/index.routes')(app);


	return app;
}