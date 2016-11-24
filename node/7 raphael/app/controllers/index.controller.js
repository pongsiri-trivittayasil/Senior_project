var Control = require('mongoose').model('Control');
var Tag = require('mongoose').model('Tag');
var Room = require('mongoose').model('Room');
var AP = require('mongoose').model('AP');
var async = require('async');


// call page ------------------------------------------------------------------


// call page map -------------------------------------------------------------
exports.render = function(req,res){
	res.render('index');
};

// function page data -------------------------------------------------------------
var stack = [];
var find_control = function(callback){
	var Control_list = [];
	//control
	Control.find({},function(err,controls){
		if(err){
			return next(err);
		}else{
			for( n in controls){
				Control_list.push({name:controls[n].Control_name,status:controls[n].Status});
			}
		}
		callback(null,Control_list);
	});
}
var find_tag = function(callback){
	var Tag_list = [];
	
	//tag
	Tag.find({},function(err,tags){
		if(err){
			return next(err);
		}else{
			for( n in tags){
				Tag_list.push({name:tags[n].Tag_name,x:tags[n].x,y:tags[n].y,room:tags[n].room});
			}
		}
	callback(null,Tag_list);
	});
	
}
var find_room = function(callback){
	var Room_list = [];
	//room
	Room.find({},function(err,rooms){
		if(err){
			return next(err);
		}else{
			for( n in rooms){
				Room_list.push({name:rooms[n].Room_name,max_x:rooms[n].max_x,min_x:rooms[n].min_x,max_y:rooms[n].max_y,min_y:rooms[n].min_y});
			}
		}
	callback(null,Room_list);
	});
		
}
var find_AP = function(callback){
	var AP_list = [];
	
	//ap
	AP.find({},function(err,aps){
		if(err){
			return next(err);
		}else{
			for( n in aps){
				AP_list.push({name:aps[n].AP_name,x:aps[n].x,y:aps[n].y});
			}
		}
	callback(null,AP_list);
	});
}

stack.push(find_control);
stack.push(find_tag);
stack.push(find_room);
stack.push(find_AP);

// call page data -------------------------------------------------------------
exports.page_data = function(req,res){
	async.parallel(stack,function(err,result){
		res.render('page_data',{
			Control_list:result[0],
			Tag_list:result[1],
			Room_list:result[2],
			AP_list:result[3]
		});
	});
};
