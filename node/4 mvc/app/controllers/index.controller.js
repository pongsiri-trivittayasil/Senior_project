exports.render = function(req,res){
	//res.send('hello world');

	if (typeof req.session.remember !== 'undefined'){
		isLoggedIn = req.session.remember;
	}
	//call view
	res.render('index',{
		'title': 'hello world',
		'message':'How are things'
	});
};