var express = require('express');
var app = express();
app.listen(3000);

var helloworld = function(req,res,next){
	//res.setHeader('Content-Type','text/plain');
	//res.end('hello world');
	//or
	res.send('hello world');
	//express help
	//text -> text/html
	//array -> application/json
	//buffer ->application/octet-stream
};

app.use('/',helloworld);

console.log('server running');

module.exports = app;
/*
app.get(path,callback)
app.post(path,callback)
**help
app.route(path)
	.get(callback)
	.post(callback);
*/
/*
in funtion(req,res,next)
**req
req.query
req.params
req.body
req.path,req.host,req.ip
**res
res.status(code)
res.ser(fiield,[value])
res.redirect([status],url)
res.send([body|status],[body])
res.json([body|status],[body])
res.render(view,[locals],callback)
*/

