var Room = require('mongoose').model('Room');

exports.create = function(req,res,next){
	var room = new Room ({Room_name:req.body.Room_Name,max_x:req.body.max_x,min_x:req.body.min_x,max_y:req.body.max_y,min_y:req.body.min_y});
	room.save(function(err){
		if(err){
			return next(err);
		}else{
			res.send(room);
		}
	});
};
exports.edit = function(req,res,next){
	Room.findOneAndUpdate({Room_name:req.body.oldname},{Room_name:req.body.newname},function(err,user){
		if(err){
			return next(err);
		}else{
			// res.send(tag);
		}
	});
};
exports.remove = function(req,res,next){
	Room.findOne({Room_name:req.body.name},function(err,user){
		if(err){
			return next(err);
		}else{
			user.remove();
		}
	});
};

exports.list = function(req,res,next){
	Room.find({},function(err,room){
		if(err){
			return next(err);
		}else{
			res.send(room);
		}
	});
};