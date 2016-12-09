var User = require('mongoose').model('User');

// call login -------------------------------------------------------------
exports.renderlogin = function(req,res){
	if (!req.user){
		res.render('login');
	} else {
		return res.redirect('/');
	}
};

// call logout -------------------------------------------------------------
exports.logout = function(req,res){
	//clear session
	req.logout();
	res.redirect('/');
};
// call signup -------------------------------------------------------------
exports.rendersignup = function(req,res){
	res.render('signup');
}
exports.signup = function(req,res,next){
	if (!req.user){
		var user = new User(req.body);
		user.provider = 'local';
		user.save(function(err){
			if(err)return res.redirect('/signup');
			req.login(user,function(err){
				if(err) return next(err);
				return res.redirect('/');
			})
		})
	} else {
		return res.redirect('/');
	}
}