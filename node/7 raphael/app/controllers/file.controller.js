var jsonfile = require('jsonfile');
var fs = require('fs');
var querystring = require('querystring');

// 'use strict'; 
var file = "./public/text2.json";

// exports.save = function(req,res,next){
// 	console.log(req.body);
// 	jsonfile.writeFile(file,JSON.stringify(req.body), function (err) {
// 		if(err){
// 			console.error(err);
// 		}
// 		else{
// 			console.log("the file was saved!");
// 		}
// 	})
// }
exports.save = function(req,res,next){
	// req.body.map((data)=>{
	// 	console.log(data);
	// });
	// console.log(req.body);
	// console.log(req.body);
	console.log(typeof req.body);
	var data = req.body;
	// console.log(data);
	console.log(JSON.stringify(data));

	jsonfile.writeFileSync(file,data);
	//     if(err) {
	//         return console.log(err);
	//     }
	// 	console.log(req.body.length);
	//     console.log(JSON.parse(req.body));
	//     console.log("The file was saved!");
	//     // console.log(req.body[1]['setName']);
	// }); 
}