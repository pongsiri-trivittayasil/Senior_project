var Control = require('mongoose').model('Control');
var Tag = require('mongoose').model('Tag');
var Room = require('mongoose').model('Room');
var AP = require('mongoose').model('AP');

exports.render = function(req,res){
	res.render('index');
};
exports.page_data = function(req,res){
	var Control_list = [];
	var Tag_list = [];
	var Room_list = [];
	var AP_list = [];
	//control
	Control.find({},function(err,controls){
		console.log(controls);
		if(err){
			return next(err);
		}else{
			for( n in controls){
		console.log(controls[n].name);
				Control_list.push({name:controls[n].Control_name,status:controls[n].Status});
			}
		}
	});
	//tag
	Tag.find({},function(err,tags){
		if(err){
			return next(err);
		}else{
			for( n in tags){
				Tag_list.push({name:tags[n].Control_name,x:tags[n].x,y:tags[n].y,room:tags[n].room});
			}
		}
	});
	//room
	Room.find({},function(err,rooms){
		if(err){
			return next(err);
		}else{
			for( n in rooms){
				Room_list.push({name:rooms[n]});
			}
		}
	});
	//ap
	AP.find({},function(err,aps){
		if(err){
			return next(err);
		}else{
			for( n in aps){
				AP_list.push({name:aps[n]});
			}
		}
	});
	// console.log(Control_list);
	res.render('page_data',{
		Control_list:Control_list,
		Tag_list:Tag_list,
		room_list:Room_list,
		AP_list:AP_list
	});
};
