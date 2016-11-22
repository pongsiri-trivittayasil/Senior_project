var Control = require('mongoose').model('Control');

exports.render = function(req,res){
	res.render('index');
};
exports.page_data = function(req,res){
	var controls_list = [];
	Control.find({},function(err,controls){
		if(err){
			return next(err);
		}else{
			for( n in controls){
				controls_list.push({name:controls[n].Control_name,status:controls[n].Status});
			}
		}
	});

	res.render('page_data',{
		controls_list:controls_list
	});
};
	/*res.render('page_data',{
		test:'oh',
		test2:10,
		authur:true,
		test4:[1,2,3],
		people: [
			    {"name":"Yehuda Katz"},
			    {"name":"Luke"},
			    {"name":"Naomi"}
			  ]
	});*/
