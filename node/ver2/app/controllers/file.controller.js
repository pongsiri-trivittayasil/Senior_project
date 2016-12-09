var jsonfile = require('jsonfile');
var fs = require('fs');
var querystring = require('querystring');


var file = "./public/map_json/";  //set path


//function save file map json
exports.save = function(req,res,next){
	var data = Object.keys(req.body);
	// console.log(req.body);
	//split name file
	// console.log(req);
	var data_split = data[0].split(':::::');
	console.log(data_split[0]);
	// console.log(req.body);
	// if(data_split[0]=='"s1",1'){
	// 	console.log()
	// }
	//name file
	var path = file + data_split[0] + ".json";
	jsonfile.writeFileSync(path,data_split[1]);

	res.send('done');
}