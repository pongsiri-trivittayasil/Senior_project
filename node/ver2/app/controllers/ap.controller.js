var AP = require('mongoose').model('AP');

exports.create = function(req,res,next){
	var ap_name = req.body.AP_name;
	var ap = new AP ({AP_name:ap_name,AP_mac:req.body.AP_mac,User:req.user.Username,Map:req.session.map});
	try {
		ap.save(function(err){
			if(err){
				return next(err);
			}else{
				res.send(ap);
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
	try {
		AP.findOneAndUpdate({AP_name:oldname,User:req.user.Username,Map:req.session.map},{AP_name:newname,AP_mac:req.body.newmac},function(err,user){
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
		AP.findOne({AP_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,user){
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
		AP.find({User:req.user.Username,Map:req.session.map},function(err,ap){
			if(err){
				return next(err);
			}else{
				res.send(ap);
			}
		});
	} catch (err){
		console.log(err);
	}
};

exports.select = function(req,res,next){
	console.log(req.body);
	var x = String(req.body.x);
	var y = String(req.body.y);
	try {
		AP.find({x:x,y:y,User:req.user.Username,Map:req.session.map},function(err,ap){
			if(err){
				res.send(err);
			}else{
				if(isEmptyObject(ap)){
					// console.log('not found');
					res.send('err');
				} else {
					res.send(ap);
					// console.log(ap);
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