var express = require('express');


module.exports = function(){
	var app = express();

	app.set('views','./app/views');
	app.set('view engine','hbs');

	require('../app/routes/index.routes')(app);

	app.use(express.static('./public'));

	return app;
}