// var Control = require('mongoose').model('Rule');

// call page data -------------------------------------------------------------
exports.render_rule = function(req,res){
		//session cookie	
	if (req.user){
		if (!req.session.map){
			req.session.map = req.body.map;
		}
		res.render('rule',{
			username:req.user ? req.user.Username : '',			
			map:req.session.map
		});
	} else {
		res.redirect('/');
	}
};

