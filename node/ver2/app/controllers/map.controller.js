var Control = require('mongoose').model('Control');
var Tag = require('mongoose').model('Tag');
var async = require('async');


// function page data -------------------------------------------------------------
var find_control = function(req,callback){
	var Control_list = [];
	//control
	try {
		Control.find({User:req.user.Username,Map:req.session.map},function(err,controls){
			if(err){
				return next(err);
			}else{
				for( n in controls){
					Control_list.push({name:controls[n].Control_name,status:controls[n].Status});
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
					Tag_list.push({name:tags[n].Tag_name,x:tags[n].x,y:tags[n].y,room:tags[n].room});
				}
			}
		callback(null,Tag_list);
		});
	} catch (err){
		console.log(err);
	}
	
}
// call page map -------------------------------------------------------------------
exports.render_map = function(req,res){
	//session cookie	
	if (req.user){
		if (!req.session.map){
			req.session.map = req.body.map;
		}
			async.parallel({
				control:find_control.bind(null,req),
				tag:find_tag.bind(null,req)
			},function(err,result){
				res.render('map',{
					username:req.user ? req.user.Username : '',			
					map:req.session.map,
					Control_list:result.control,
					Tag_list:result.tag
				});
			});
	} else {
		res.redirect('/');
	}
};