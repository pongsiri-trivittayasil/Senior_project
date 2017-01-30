var Tag = require('mongoose').model('Tag');

exports.create = function(req,res,next){
	try {
		var Tag_name = req.body.Tag_name;
		var tag = new Tag ({Tag_name:Tag_name,Tag_id:req.body.Tag_id,room:"-1",User:req.user.Username,Map:req.session.map});
		tag.save(function(err){
			if(err){
				return next(err);
			}else{
				res.send(tag);
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.edit = function(req,res,next){
	try {
		console.log(req.body);
		Tag.findOneAndUpdate({Tag_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Tag_name:req.body.newname,Tag_id:req.body.newid},function(err,user){
			if(err){
				return next(err);
			}else{
				// res.send(tag);
				res.send('done');
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.remove = function(req,res,next){
	try {
		Tag.findOne({Tag_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,user){
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
		Tag.find({User:req.user.Username,Map:req.session.map},function(err,tag){
			if(err){
				return next(err);
			}else{
				res.send(tag);
			}
		});
	} catch (err){
		console.log(err);
	}
};