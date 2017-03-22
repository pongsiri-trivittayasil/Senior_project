var History = require('mongoose').model('History');
var Room = require('mongoose').model('Room');

function save_history(){
	console.log('save');
	var temp = new History({time:"time",tagid:"1",roomid:"1"});
	temp.save();
}
// save_history();

exports.list_history = function(req,res){
	var list = [];
	try {
		History.find({tagid:req.body.tagid},function(err,documents){
			if(documents.length > 0){
				for (n in documents){
					list.push({"time":documents[n].time,"room":documents[n].roomid});
				}
				// console.log(list);
				res.send(list);
			}
		});
	} catch (err){
		console.log(err);
	}
};

// list_history("1");
// call page data -------------------------------------------------------------
exports.render_history = function(req,res){
		//session cookie	
	if (req.user){
		if (!req.session.map){
			req.session.map = req.body.map;
		}
		res.render('history',{
			username:req.user ? req.user.Username : '',			
			map:req.session.map
		});
	} else {
		res.redirect('/');
	}
};

