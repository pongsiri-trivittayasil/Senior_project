var choose_map = require('mongoose').model('Map');
var async = require('async');


//function find map from user
var find_map = function(req,callback){
	try {
		choose_map.find({User:req.user.Username},function(err,maps){
			var map_list = [];
			if(err){
				return next(err);
			} else {
				for ( n in maps){
					map_list.push({name:maps[n].Mapname});
				}
			}
			callback(null,map_list);
		});
	} catch (err){
		console.log(err);
	}
}
// call page choose map -------------------------------------------------------------
exports.render_choose_map = function(req,res){	
	if(req.user){
		req.session.map = null;
		async.parallel({map:find_map.bind(null,req)},function(err,result){
			console.log(result);
			res.render('choose_map',{
				map:result.map,
				username:req.user.Username
			});
		});
	} else {
		res.redirect('/');
	}
	save_map(req);
};


// function create map-------------------------------------------------------------
function save_map(req){
	var save_map = new choose_map({Mapname:"homegod",User:req.user.Username});
	save_map.save();
	var save_map2 = new choose_map({Mapname:"floor5",User:req.user.Username});
	save_map2.save();
}