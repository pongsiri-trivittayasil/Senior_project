var Tag = require('mongoose').model('Tag');

exports.create = function(req,res,next){
	var tag = new Tag ({Tag_name:req.body.Tag_Name,x:-1,y:-1,room:"-1"});
	tag.save(function(err){
		if(err){
			return next(err);
		}else{
			res.send(tag);
		}
	});
};
exports.edit = function(req,res,next){
	Tag.findOneAndUpdate({Tag_name:req.body.oldname},{Tag_name:req.body.newname},function(err,user){
		if(err){
			return next(err);
		}else{
			// res.send(tag);
		}
	});
};
exports.remove = function(req,res,next){
	Tag.findOne({Tag_name:req.body.name},function(err,user){
		if(err){
			return next(err);
		}else{
			user.remove();
		}
	});
};

exports.list = function(req,res,next){
	Tag.find({},function(err,tag){
		if(err){
			return next(err);
		}else{
			res.send(tag);
		}
	});
};