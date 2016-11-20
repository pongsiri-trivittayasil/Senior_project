var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ControlSchema = new Schema({
	Control_name: {type:String,unique:false,index:true},
//	Control_name: {type:String,unique:false,index:true},
	Status: Boolean
});

mongoose.model('Control',ControlSchema);