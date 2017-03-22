var Room = require('mongoose').model('Room');

exports.create = function(req,res,next){
	try {
		var room_name = req.body.Room_name;
		var room = new Room ({Room_name:room_name,Room_id:req.body.Room_id,Room_mac:req.body.Room_mac,InitialValue:req.body.initialvalue,InitialValueESPAP:req.body.initialvalueESPAP,max_x:req.body.max_x,min_x:req.body.min_x,max_y:req.body.max_y,min_y:req.body.min_y,User:req.user.Username,Map:req.session.map});
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
		Room.findOneAndUpdate({Room_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Room_name:req.body.newname,Room_id:req.body.newid,Room_mac:req.body.newmac,InitialValue:req.body.newinitialvalue,InitialValueESPAP:req.body.newinitialvalueESPAP},function(err,user){
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
exports.editName = function(req,res,next){
	try {
		Room.findOneAndUpdate({Room_name:req.body.oldname,User:req.user.Username,Map:req.session.map},{Room_name:req.body.newname},function(err,user){
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
exports.editInit = function(req,res,next){
	try {
		Room.findOneAndUpdate({Room_name:req.body.Room_name,User:req.user.Username,Map:req.session.map},{InitialValue:req.body.newinit},function(err,user){
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


exports.select_mac_id = function(req,res,next){
	try {
		Room.find({Room_name:req.body.name,User:req.user.Username,Map:req.session.map},function(err,room){
			if(err){
				res.send(err);

			}else{
				console.log(room);
				if(isEmptyObject(room)){
					// console.log('not found');ww
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


exports.removelist = function(User,Map){
	Room.find({User:User,Map:Map},function(err,documents){
		if(documents.length > 0){
			for (n in documents){
				documents[n].remove();
			}
		}
	});
};
