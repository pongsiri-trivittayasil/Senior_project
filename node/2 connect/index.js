var connect = require('connect');
var app = connect();
app.listen(3000);

var logger = function(req,res,next){
	console.log(req.method,req.url);

	next();
};

var helloworld = function(req,res,next){
	//middleware is function trub parameter
	//req = object have detail of http request
	//res = object have detail of http response
	//next = function go to next middleware 
	res.setHeader('Content-Type','text/plain');
	res.end('hello world');
};
var goodbyeworld = function(req,res,next){
	//middleware is function trub parameter
	//req = object have detail of http request
	//res = object have detail of http response
	//next = function go to next middleware 
	res.setHeader('Content-Type','text/plain');
	res.end('goodbyeworld');
};

app.use(logger);
app.use(helloworld);

app.use('/goodbyeworld',goodbyeworld)

console.log('server running');