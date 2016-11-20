var Control = require('mongoose').model('Control');

exports.create = function(req,res,next){
	var control = new Control ({Control_name:req.body.Control_Name,Status:false});
	control.save(function(err){
		if(err){
			return next(err);
		}else{
			//res.send(control);
		}
	});

};