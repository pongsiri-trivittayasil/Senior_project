var Control = require('mongoose').model('Control');
var Tag = require('mongoose').model('Tag');
var Room = require('mongoose').model('Room');
var AP = require('mongoose').model('AP');
var Line = require('mongoose').model('Line');
var async = require('async');

// function page data -------------------------------------------------------------
var find_control = function(req,callback){
	var Control_list = [];
	try {
		//control
		Control.find({User:req.user.Username,Map:req.session.map},function(err,controls){
			if(err){
				return next(err);
			}else{
				for( n in controls){
					Control_list.push({name:controls[n].Control_name,status:controls[n].Status,id:controls[n].Control_id});
				}
			}
			callback(null,Control_list);
		});
	} catch (err){
		console.log(err);
	}
}
var find_tag = function(req,callback){
	var Tag_list = [];
	try {
		//tag
		Tag.find({User:req.user.Username,Map:req.session.map},function(err,tags){
			if(err){
				return next(err);
			}else{
				for( n in tags){
					Tag_list.push({name:tags[n].Tag_name,x:tags[n].x,y:tags[n].y,room:tags[n].room,id:tags[n].Tag_id});
				}
			}
		callback(null,Tag_list);
		});
	} catch (err){
		console.log(err);
	}
	
}
var find_room = function(req,callback){
	var Room_list = [];
	try {
		//room
		Room.find({User:req.user.Username,Map:req.session.map},function(err,rooms){
			if(err){
				return next(err);
			}else{
				for( n in rooms){
					Room_list.push({name:rooms[n].Room_name,max_x:rooms[n].max_x,min_x:rooms[n].min_x,max_y:rooms[n].max_y,min_y:rooms[n].min_y,id:rooms[n].Room_id,mac:rooms[n].Room_mac,initialvalue:rooms[n].InitialValue});
				}
			}
		callback(null,Room_list);
		});
	} catch (err){
		console.log(err);
	}
		
}
var find_AP = function(req,callback){
	var AP_list = [];
	try {
		//ap
		AP.find({User:req.user.Username,Map:req.session.map},function(err,aps){
			if(err){
				return next(err);
			}else{
				for( n in aps){
					AP_list.push({name:aps[n].AP_name,x:aps[n].x,y:aps[n].y});
				}
			}
		callback(null,AP_list);
		});
	} catch (err){
		console.log(err);
	}
}
var find_Line = function(req,callback){
	var Line_list = [];
	try {
		//ap
		Line.find({User:req.user.Username,Map:req.session.map},function(err,lines){
			if(err){
				return next(err);
			}else{
				for( n in lines){
					Line_list.push({name:lines[n].Line_name,token:lines[n].Line_token});
				}
			}
		callback(null,Line_list);
		});
	} catch (err){
		console.log(err);
	}
}


// call page data -------------------------------------------------------------
exports.render_page_data = function(req,res){
		//session cookie	
	if (req.user){
		if (!req.session.map){
			req.session.map = req.body.map;
		}
			async.parallel({
				control:find_control.bind(null,req),
				tag:find_tag.bind(null,req),
				room:find_room.bind(null,req),
				AP:find_AP.bind(null,req),
				Line:find_Line.bind(null,req),
			},function(err,result){
				// console.log(result.control);
				// console.log(result.Tag);
				// console.log(result.room);
				// console.log(result.AP);
				res.render('page_data',{
					Control_list:result.control,
					Tag_list:result.tag,
					Room_list:result.room,
					AP_list:result.AP,
					Line_list:result.Line,
					username:req.user ? req.user.Username : '',			
					map:req.session.map
				});
			});
	} else {
		res.redirect('/');
	}
};

