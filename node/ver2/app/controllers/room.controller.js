var Room = require('mongoose').model('Room');

exports.create = function(req,res,next){
	try {
		var room_name = req.body.Room_name;
		var room = new Room ({Room_name:room_name,Room_id:req.body.Room_id,Room_mac:req.body.Room_mac,IntitialValue:req.body.IntitialValue, max_x:req.body.max_x,min_x:req.body.min_x,max_y:req.body.max_y,min_y:req.body.min_y,User:req.user.Username,Map:req.session.map});
		room.save(function(err){
			if(err){
				console.log('err');
				console.log(err);
				res.send(err);
			}else{
				res.send("done");
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.edit = function(req,res,next){
	try {
		Room.findOneAndUpdate({Room_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Room_name:req.body.newname,Room_id:req.body.newid,Room_mac:req.body.newmac,IntitialValue:req.body.newintitialvalue},function(err,user){
			if(err){
				res.send(err);
			}else{
				res.send("done");
			}
		});
	} catch (err){
		console.log(err);
	}
};
exports.remove = function(req,res,next){
	try {
		Room.findOne({Room_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,user){
			if(err){
				res.send(err);
			}else{
				user.remove();
				res.send("done");
			}
		});
	} catch (err){
		console.log(err);
	}
};

exports.list = function(req,res,next){
	try {
		Room.find({User:req.user.Username,Map:req.session.map},function(err,room){
			if(err){
				res.send(err);
			}else{
				res.send(room);
			}
		});
	} catch (err){
		console.log(err);
	}
};

exports.select = function(req,res,next){
	try {
		Room.find({min_x:req.body.min_x,max_y:req.body.max_y,User:req.user.Username,Map:req.session.map},function(err,room){
			if(err){
				res.send(err);

			}else{
				if(isEmptyObject(room)){
					// console.log('not found');
					res.send('err');
				} else {
					res.send(room);
					// console.log(room);
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