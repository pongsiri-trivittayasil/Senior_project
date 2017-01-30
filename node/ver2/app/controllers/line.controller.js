var Line = require('mongoose').model('Line');

exports.create = function(req,res,next){
	var Line_name = req.body.Line_name;
	var line = new  Line({Line_name:Line_name,Line_token:req.body.Line_token,User:req.user.Username,Map:req.session.map});
	try {
		line.save(function(err){
			if(err){
				return next(err);
			}else{
				res.send(line);
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.edit = function(req,res,next){
	console.log(req.body);
	var oldname = req.body.oldname;
	var newname = req.body.newname;
	console.log(oldname);
	console.log(newname);
	try {
		Line.findOneAndUpdate({Line_name:oldname,User:req.user.Username,Map:req.session.map},{Line_name:newname,Line_token:req.body.newtoken},function(err,user){
			if(err){
				return next(err);
			}else{
				console.log(user);
				res.send('done');
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.remove = function(req,res,next){
	try {
		Line.findOne({Line_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,user){
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
		Line.find({User:req.user.Username,Map:req.session.map},function(err,line){
			if(err){
				return next(err);
			}else{
				res.send(line);
			}
		});
	} catch (err){
		console.log(err);
	}
};

exports.select = function(req,res,next){
	console.log(req.body);
	try {
		Line.find({User:req.user.Username,Map:req.session.map},function(err,line){
			if(err){
				res.send(err);
			}else{
				if(isEmptyObject(line)){
					// console.log('not found');
					res.send('err');
				} else {
					res.send(line);
				}
			}
		});
	} catch (err){
		console.log(err);
	}
};


// check empty
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}