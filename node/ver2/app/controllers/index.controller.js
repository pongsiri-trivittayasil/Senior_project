// call home ----------------------------------------------------------------------
exports.render_home = function(req,res){
	req.session.map = null; //clear session choose map
	res.render('index',{
			username:req.user ? req.user.Username : ''
		});
	// if(!req.user){
	// 	res.render('index',{
	// 		username:req.user ? req.user.Username : ''
	// 	});
	// } else{
		// res.redirect('/choose_map');
	// }
};


exports.test = function(req,res){
	console.log(req.body);
	console.log(typeof req.body);

};
