var AP = require('mongoose').model('AP');

exports.create = function(req,res,next){
	console.log("req.body");
	console.log(req.body);
	console.log(req.body.AP_Name);
	var ap = new AP ({AP_name:req.body.AP_Name,x:-1,y:-1});
	ap.save(function(err){
		if(err){
			return next(err);
		}else{
			res.send(ap);
		}
	});
};
exports.edit = function(req,res,next){
	AP.findOneAndUpdate({AP_Name:req.body.oldname},{AP_Name:req.body.newname},function(err,user){
		if(err){
			return next(err);
		}else{
			// res.send(tag);
		}
	});
};
exports.remove = function(req,res,next){
	AP.findOne({AP_Name:req.body.name},function(err,user){
		if(err){
			return next(err);
		}else{
			user.remove();
		}
	});
};

exports.list = function(req,res,next){
	AP.find({},function(err,ap){
		if(err){
			return next(err);
		}else{
			res.send(ap);
		}
	});
};