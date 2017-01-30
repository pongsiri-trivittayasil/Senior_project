var IfTime = require('mongoose').model('IfTime');
var IfTag = require('mongoose').model('IfTag');
var IfDay = require('mongoose').model('IfDay');
var IfDate = require('mongoose').model('IfDate');
var IfStatus = require('mongoose').model('IfStatus');
var ThenLine = require('mongoose').model('ThenLine');
var ThenControl = require('mongoose').model('ThenControl');

// if tag
exports.If_Create_Tag = function(req,res,next){
	try {
		var tag = new IfTag ({IfTag_id:req.body.IfTag_id,IfTag_name:req.body.IfTag_name,IfTag_room:req.body.IfTag_room,User:req.user.Username,Map:req.session.map});
		tag.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(tag);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// if time
exports.If_Create_Time = function(req,res,next){
	try {
		var time = new IfTime ({IfTime_id:req.body.IfTime_id,IfTime_time:req.body.IfTime_time,User:req.user.Username,Map:req.session.map});
		time.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(time);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// if day
exports.If_Create_Day = function(req,res,next){
	console.log(req.body);
	try {
		var day = new IfDay ({IfDay_id:req.body.IfDay_id,IfDay_day:req.body.IfDay_day,User:req.user.Username,Map:req.session.map});
		day.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(day);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// if date
exports.If_Create_Date = function(req,res,next){
	try {
		var date = new IfDate ({IfDate_id:req.body.IfDate_id,IfDate_date:req.body.IfDate_date,User:req.user.Username,Map:req.session.map});
		date.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(date);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// if Status
exports.If_Create_Status = function(req,res,next){
	try {
		var status = new IfStatus ({IfID:req.body.IfID,IfTime:req.body.IfTime,IfDay:req.body.IfDay,IfDate:req.body.IfDate,IfTag:req.body.IfTag});
		status.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(status);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// then line
exports.Then_Create_Line = function(req,res,next){
	try {
		var line = new ThenLine ({ThenLine_id:req.body.ThenLine_id,ThenLine_token:req.body.ThenLine_token,ThenLine_message:req.body.ThenLine_message,User:req.user.Username,Map:req.session.map});
		line.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(line);
			}
		});
	} catch (err){
		console.log(err);
	}
};
// then control
exports.Then_Create_Control = function(req,res,next){
	try {
		var control = new ThenControl ({ThenControl_id:req.body.ThenControl_id,ThenControl_Control_id:req.body.ThenControl_Control_id,ThenControl_status:req.body.ThenControl_status,User:req.user.Username,Map:req.session.map});
		control.save(function(err){
			if(err){
				return next(err);
			} else {
				res.send(control);
			}
		});
	} catch (err){
		console.log(err);
	}
};
