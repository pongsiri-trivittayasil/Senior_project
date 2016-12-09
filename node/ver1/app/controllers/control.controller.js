var Control = require('mongoose').model('Control');

exports.create = function(req,res,next){
	var control = new Control ({Control_name:req.body.Control_Name,Status:false});
	control.save(function(err){
		if(err){
			return next(err);
		}else{
			res.send(control);
		}
	});
};
exports.edit = function(req,res,next){
	Control.findOneAndUpdate({Control_name:req.body.oldname},{Control_name:req.body.newname},function(err,user){
		if(err){
			return next(err);
		}else{
			// res.send();
		}
	});
};
exports.remove = function(req,res,next){
	Control.findOne({Control_name:req.body.name},function(err,user){
		if(err){
			return next(err);
		}else{
			user.remove();
		}
	});
};

exports.list = function(req,res,next){
	Control.find({},function(err,controls){
		if(err){
			return next(err);
		}else{
			res.send(controls);
		}
	});
};