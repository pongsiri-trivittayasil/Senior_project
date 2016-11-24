var jsonfile = require('jsonfile');
// 'use strict'; 
var file = "./public/text.json";

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
// var fs = require('fs');
exports.save = function(req,res,next){
	// req.body.map((data)=>{
	// 	console.log(data);
	// });
	// console.log(req.body);
	console.log(req.body);
	jsonfile.writeFileSync(file,(req.body),'utf8')
	//     if(err) {
	//         return console.log(err);
	//     }
	// 	console.log(req.body.length);
	//     console.log(JSON.parse(req.body));
	//     console.log("The file was saved!");
	//     // console.log(req.body[1]['setName']);
	// }); 
}