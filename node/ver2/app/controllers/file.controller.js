var jsonfile = require('jsonfile');
var fs = require('fs');
var querystring = require('querystring');
// savenewmap
var formidable = require('formidable');
var path = require('path');

var file = "./public/map_json/";  //set path

var map = require('mongoose').model('Map');


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

exports.savemap = function(req,res,next){
	// create an incoming form object
	var form = new formidable.IncomingForm();
	var name;

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '../../public/uploads');

	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, req.user.Username+"-"+file.name));
		// console.log(file.name);
		name = file.name.split('.');
		var create_map = new map({Mapname:name[0],User:req.user.Username});
		create_map.save();
	});

	// log any errors that occur
	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
		req.session.map = name[0];
		req.session.newmap = "True";
		res.end('success');
	});

	// parse the incoming request containing the form data
	form.parse(req);
	// console.log(JSON.stringify(req.body));
}