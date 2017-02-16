var Control = require('mongoose').model('Control');

exports.create = function(req,res,next){
	try {
		var control = new Control ({Control_name:req.body.Control_Name,Control_id:req.body.Control_id,Status:false,User:req.user.Username,Map:req.session.map});
		control.save(function(err){
			if(err){
				return next(err);
			}else{
				res.send(control);
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.edit = function(req,res,next){
	try {
		Control.findOneAndUpdate({Control_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Control_name:req.body.newname,Control_id:req.body.newid},function(err,user){
			if(err){
				return next(err);
			}else{
				res.send('done');
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.editstatus = function(req,res,next){
	try {
		Control.findOneAndUpdate({Control_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Status:req.body.status},function(err,user){
			if(err){
				return next(err);
			}else{
				res.send('done');
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.remove = function(req,res,next){
	try {
		Control.findOne({Control_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,user){
			if(err){
				return next(err);
			}else{
				user.remove();
				res.send('done');
			}
		});
	} catch (err){
		console.log(err);
	}
};

exports.list = function(req,res,next){
	try {
		Control.find({User:req.user.Username,Map:req.session.map},function(err,controls){
			if(err){
				return next(err);
			}else{
				res.send(controls);
			}
		});
	} catch (err){
		console.log(err);
	}
};